/**
 * Zo2 Shortcode
 * @param {pointer} w Window pointer
 * @param {pointer} $ jQuery pointer
 * @returns {undefined}
 */
(function (w, $) {

    /* Small extension for jQuery */
    $.fn.extend({
        insertAtCaret: function (myValue) {
            return this.each(function (i) {
                if (w.document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    var sel = w.document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                }
                else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            });
        }
    });

    /* Short code main class */
    var _shortcode = {
        /* Short code add on */
        _addOn: [],
        /**
         * Elements selector
         */
        _elements: {
            /* Joomla article editor */
            joomlaEditor: "jform_articletext",
            /* Shortcode tabs */
            tabGroup: "#zo2-shortcode-groups",
            tabList: "#zo2-shortcode-tabs-wrapper > #myTab",
            tabContent: "#zo2-shortcode-tabs-wrapper > #myTabContent",
            /* Common controls */
            comControls: "#zo2-shortcode-common-controls",
            /* Shortcode preview */
            comPreview: "#zo2-shortcode-preview",
            shortcodeContent: "#zo2-sc-value",
            shortcodeRender: "#zo2-sc-render",
            shortcodePreview: "#zo2-sc-preview-content",
            /* Control button */
            comButtons: "#zo2-shortcode-controls",
            buttonInsert: "#zo2-sc-insert",
            buttonPreview: "#zo2-sc-preview",
            buttonClose: "#zo2-sc-close",
            /* Shortcode breadcrumb */
            breadcrumdContainer: "#zo2-shortcode-breadcrumd",
            breadcrumdHome: "#zo2-sc-all-shortcode",
            breadcrumdCurrent: "#zo2-sc-current-tab"
        },
        /**
         * Select function
         * @returns {undefined}
         */
        _init: function () {

            var _self = this;
            /* Insert button */
            $(_self._elements.buttonInsert).on('click', function () {
                var code = $(_self._elements.shortcodeContent).val();
                if (typeof (w.parent) !== 'undefined') {
                    if (w.parent.hasOwnProperty('jInsertEditorText')) {
                        /* Insert to parent editor */
                        w.parent.jInsertEditorText(code, _self._elements.joomlaEditor);
                        /* Close the box */
                        w.parent.SqueezeBox.close();
                    }
                }
            });
            
            /* Preview button */
            $(_self._elements.buttonPreview).on('click', function () {
                if ($(_self._elements.buttonPreview).text() === 'Preview Shortcode') {
                    $(_self._elements.buttonPreview).text('Hide Shortcode');
                } else {
                    $(_self._elements.buttonPreview).text('Preview Shortcode');
                }
                $(_self._elements.comPreview)
                        .find(_self._elements.shortcodePreview)
                        .toggle('slow', function () {
                            /* Scroll to end of page */
                            $("html, body").animate({scrollTop: $(w.document).height()});
                        });
            });

            /* Hide tab & group after choice */
            $(_self._elements.tabList).on('click', 'li', function () {
                var currentTab = $(this).find('a').text();
                $(_self._elements.breadcrumdCurrent)
                        .html('&rarr;' + currentTab);
                $(_self._elements.tabList).hide('slow');
                $(_self._elements.tabGroup).hide('slow');
                $(_self._elements.breadcrumdContainer).show('slow');
            });

            /* Bread crumd home */
            $(_self._elements.breadcrumdContainer).on('click', _self._elements.breadcrumdHome, function () {
                $(_self._elements.tabList).show('slow');
                $(_self._elements.tabGroup).show('slow');
                $(_self._elements.buttonPreview).text('Preview Shortcode');
                $(_self._elements.comPreview)
                        .find(_self._elements.shortcodePreview)
                        .hide('slow', function () {
                            $("html, body").animate({scrollTop: 0});
                        });
                _self.value('');
                _self.preview('');
                $(_self._elements.breadcrumdContainer).hide('slow');
                $(_self._elements.breadcrumdCurrent)
                        .html('');
                $(_self._elements.tabContent).find('.active').removeClass('active in');
                $(_self._elements.tabList).find('.active').removeClass('active');
            });

            /* Close button */
            $(_self._elements.buttonClose).on('click', function () {
                if (typeof (w.parent) !== 'undefined') {
                    if (w.parent.hasOwnProperty('SqueezeBox')) {
                        w.parent.SqueezeBox.close();
                    }
                }
            });

            /* Init shortcode add-on */
            $(this._addOn).each(function (key, item) {
                if (item.hasOwnProperty('_init')) {
                    item._init();
                }
            });
        },
        /**
         * Set shortcode value
         * @param {type} value
         * @returns {undefined}
         */
        value: function (value) {
            $(this._elements.shortcodeContent).val(value);
        },
        /**
         * Preview shortcode HTML
         * @param {type} html
         * @returns {undefined}
         */
        preview: function (html) {
            console.log(html);
            $(this._elements.shortcodeRender).html(html);
        }

    };

    /* Check for Zo2 javascript framework */
    if (typeof (w.zo2) === 'undefined') {
        w.zo2 = {};
    }

    /* Append short code to Zo2 */
    w.zo2.shortcode = _shortcode;

    /* Init shortcode */
    $(w.document).ready(function () {
        w.zo2.shortcode._init();
    });

})(window, jQuery);

/**
 * Label shortcode add-on
 * @param {type} w
 * @param {type} $
 * @file shortcode.label.js
 * @returns {undefined}
 */
(function (w, $) {

    /* Label shortcode class */
    var _label = {
        name: 'Label shortcode add-on',
        /* Selector container */
        _elements: {
            value: "#zo2-sc-label-name",
            type: "#zo2-sc-label-type"
        },
        /**
         * Init function
         * @returns {undefined}
         */
        _init: function () {
            var _self = this;
            $(_self._elements.value).on('keyup', function () {
                _self._update();
            });
            $(_self._elements.type).on('change', function () {
                _self._update();
            });
        },
        /**
         * Update shortcode
         * @returns {undefined}
         */
        _update: function () {
            var _self = this;
            var type = $(_self._elements.type).val();
            var value = $(_self._elements.value).val();
            w.zo2.shortcode.value('[zt_label type="' + type + '"]' + value + '[/zt_label]');
            w.zo2.shortcode.preview('<span class="label label-' + type + '">' + value + '</span>');
        }
    };

    /* Append to shortcode add-ons */
    w.zo2.shortcode._addOn.push(_label);

})(window, jQuery);

/**
 * Button shortcode add-on
 * @param {type} w
 * @param {type} $
 * @file shortcode.button.js
 * @returns {undefined}
 */
(function (w, $) {

    /* Button shortcode class */
    var _button = {
        name: 'Button shortcode add-on',
        /* Selector container */
        _elements: {
            text: "#zo2-sc-button-text",
            type: "#zo2-sc-button-type",
            size: "#zo2-sc-button-size",
            colour: "#zo2-sc-button-colour",
            icon: "#list-icon-button",
            link: "#zo2-sc-button-link",
            extraClass: "#zo2-sc-button-extra-class"
        },
        /**
         * Init function
         * @returns {undefined}
         */
        _init: function () {
            var _self = this;
            $(_self._elements.icon).find('a').on('click', function () {
                $(_self._elements.icon).find('a').removeClass('selected');
                $(this).addClass('selected');
                _self._update();
                return false;
            });
            $(_self._elements.colour + ', '
                    + _self._elements.size + ', '
                    + _self._elements.type).on('change', function () {
                _self._update();
            });
            $(_self._elements.text + ', '
                    + _self._elements.extraClass + ', '
                    + _self._elements.link).on('keyup', function () {
                _self._update();
            });
        },
        /**
         * Update shortcode
         * @returns {undefined}
         */
        _update: function () {
            var _self = this;
            var text = $(_self._elements.text).val();
            var extraClass = $(_self._elements.extraClass).val();
            var colour = $(_self._elements.colour).val();
            var link = $(_self._elements.link).val();
            var size = $(_self._elements.size).val();
            var type = $(_self._elements.type).val();
            var icon = _self._getIcon();
            var shortcode = '[zt_button';
            shortcode += (type !== '') ? ' type="' + type + '"' : '';
            shortcode += (size !== '') ? ' size="' + size + '"' : '';
            shortcode += (colour !== '') ? ' colour="' + colour + '"' : '';
            shortcode += (link !== '') ? ' link="' + link + '"' : '';
            shortcode += (icon !== '') ? ' icon="' + icon + '"' : '';
            shortcode += (extraClass !== '') ? ' extra-class="' + extraClass + '"' : '';
            shortcode += ']' + text + '[/zt_button]';
            w.zo2.shortcode.value(shortcode);
        },
        /**
         * Get button icon
         * @returns {String}
         */
        _getIcon: function () {
            var selected = $(this._elements.icon).find('.selected');
            return (selected.length <= 0) ? '' : selected.find('i').attr('class');
        }
    };

    /* Append to shortcode add-ons */
    w.zo2.shortcode._addOn.push(_button);

})(window, jQuery);

/**
 * Dropcap shortcode add-on
 * @param {type} w
 * @param {type} $
 * @file shortcode.dropcap.js
 * @returns {undefined}
 */
(function (w, $) {

    /* Dropcap shortcode class */
    var _dropcap = {
        name: 'Dropcap shortcode add-on',
        /* Selector container */
        _elements: {
            type: "#zo2-sc-dropcaps-type",
            textColour: "#zo2-sc-dropcaps-text-color",
            bgColour: "#zo2-sc-dropcaps-bg-color",
            content: "#zo2-sc-dropcaps-content"
        },
        /**
         * Init function
         * @returns {undefined}
         */
        _init: function () {
            var _self = this;
            $(_self._elements.type).on('change', function () {
                _self._update();
            });
            $(_self._elements.content + ', '
                    + _self._elements.textColour + ', '
                    + _self._elements.bgColour).on('keyup', function () {
                _self._update();
            });
        },
        /**
         * Update shortcode
         * @returns {undefined}
         */
        _update: function () {
            var _self = this;
            var content = $(_self._elements.content).val();
            var bgColour = $(_self._elements.bgColour).val();
            var colour = $(_self._elements.textColour).val();
            var type = $(_self._elements.type).val();
            var shortcode = '[zt_dropcap';
            shortcode += (type !== '') ? ' type="' + type + '"' : '';
            shortcode += (colour !== '') ? ' textColour="' + colour + '"' : '';
            shortcode += (bgColour !== '') ? ' bgColour="' + bgColour + '"' : '';
            shortcode += ']' + content + '[/zt_dropcap]';
            w.zo2.shortcode.value(shortcode);
        }
    };

    /* Append to shortcode add-ons */
    w.zo2.shortcode._addOn.push(_dropcap);

})(window, jQuery);


/**
 * Messagebox shortcode add-on
 * @param {type} w
 * @param {type} $
 * @file shortcode.messagebox.js
 * @returns {undefined}
 */
(function (w, $) {

    /* Messagebox shortcode class */
    var _messageBox = {
        name: 'MessageBox shortcode add-on',
        /* Selector container */
        _elements: {
            content: "#zo2-sc-message-box-content",
            type: "#zo2-sc-message-box-type",
            icon: "#list-icon-message-box",
            extraClass: "#zo2-sc-message-box-class"
        },
        /**
         * Init function
         * @returns {undefined}
         */
        _init: function () {
            var _self = this;
            $(_self._elements.icon).find('a').on('click', function () {
                $(_self._elements.icon).find('a').removeClass('selected');
                $(this).addClass('selected');
                _self._update();
                return false;
            });
            $(_self._elements.type).on('change', function () {
                _self._update();
            });
            $(_self._elements.content + ', '
                    + _self._elements.extraClass).on('keyup', function () {
                _self._update();
            });
        },
        /**
         * Update shortcode
         * @returns {undefined}
         */
        _update: function () {
            var _self = this;
            var content = $(_self._elements.content).val();
            var extraClass = $(_self._elements.extraClass).val();
            var type = $(_self._elements.type).val();
            var icon = _self._getIcon();
            var shortcode = '[zt_message_box';
            shortcode += (type !== '') ? ' type="' + type + '"' : '';
            shortcode += (icon !== '') ? ' icon="' + icon + '"' : '';
            shortcode += (extraClass !== '') ? ' extra-class="' + extraClass + '"' : '';
            shortcode += ']' + content + '[/zt_message_box]';
            w.zo2.shortcode.value(shortcode);
        },
        /**
         * Get messagebox icon
         * @returns {String}
         */
        _getIcon: function () {
            var selected = $(this._elements.icon).find('.selected');
            return (selected.length <= 0) ? '' : selected.find('i').attr('class');
        }
    };

    /* Append to shortcode add-ons */
    w.zo2.shortcode._addOn.push(_messageBox);

})(window, jQuery);

/**
 * Tabs shortcode add-on
 * @param {type} w
 * @param {type} $
 * @file shortcode.tabs.js
 * @returns {undefined}
 */
(function (w, $) {

    /* Tabs shortcode class */
    var _tabs = {
        name: 'Tabs shortcode add-on',
        /* Selector container */
        _elements: {
            newTab: "#zo2-sc-new-tab",
            container: "#zo2-sc-tabs-container",
            element: "#zo2-sc-tabs-element",
            title: "#zo2-sc-tab-title",
            id: "#zo2-sc-tab-id",
            content: "#zo2-sc-tab-content",
            active: "#zo2-sc-tab-active"
        },
        /**
         * Init function
         * @returns {undefined}
         */
        _init: function () {
            var _self = this;
            $(_self._elements.container).children()
                    .last()
                    .find(_self._elements.id)
                    .val('zt-tab-' + $(_self._elements.container).children().last().index());
            $(_self._elements.newTab).on('click', function () {
                $(_self._elements.element).first()
                        .clone()
                        .appendTo(_self._elements.container);
                $(_self._elements.container).children()
                        .last()
                        .find(_self._elements.title)
                        .val('');
                $(_self._elements.container).children()
                        .last()
                        .find(_self._elements.content)
                        .val('');
                $(_self._elements.container).children()
                        .last()
                        .find(_self._elements.id)
                        .val('zt-tab-' + $(_self._elements.container).children().last().index());
                $(_self._elements.container).children()
                        .last()
                        .find(_self._elements.active)
                        .removeAttr('checked');
            });
            /* One active tab per tabs shortcode */
            $(_self._elements.container).on('click', _self._elements.active, function () {
                var checked = $(this).is(':checked');
                $(_self._elements.container).children()
                        .find(_self._elements.active)
                        .removeAttr('checked');
                if ($(_self._elements.container).children().length === 1) {
                    if (!checked) {
                        $(this).removeAttr('checked');
                    } else {
                        $(this).prop('checked', true);
                    }
                } else {
                    $(this).prop('checked', true);
                }
                _self._update();
            });
            $(_self._elements.container).on('keyup',
                    _self._elements.title + ', '
                    + _self._elements.id + ', '
                    + _self._elements.content
                    , function () {
                        _self._update();
                    });
        },
        /**
         * Update shortcode
         * @returns {undefined}
         */
        _update: function () {
            var _self = this;
            var shortcode = '';
            var $tabs = $(_self._elements.container).children();
            $tabs.each(function () {
                shortcode += _self._genTabShortcode($(this));
            });
            var shortcode = '[zt_tabs ' + (($tabs.length > 0) ? ' tabs="' + $tabs.length + '"' : '')
                    + ']' + shortcode + '[/zt_tabs]';
            w.zo2.shortcode.value(shortcode);
        },
        /**
         * Generate tab shortcode
         * @param {type} $tab
         * @returns {undefined}
         */
        _genTabShortcode: function ($tab) {
            var title = $tab.find(this._elements.title).val();
            var id = $tab.find(this._elements.id).val();
            var content = $tab.find(this._elements.content).val();
            var active = $tab.find(this._elements.active).is(':checked');
            var shortcode = '[zt_tab';
            shortcode += (id !== '') ? ' id="' + id + '"' : '';
            shortcode += (title !== '') ? ' title="' + title + '"' : '';
            shortcode += (active) ? ' active="true"' : '';
            shortcode += ']' + content + '[/zt_tab]';
            return shortcode;
        }
    };

    /* Append to shortcode add-ons */
    w.zo2.shortcode._addOn.push(_tabs);

})(window, jQuery);

/**
 * Blockquotes shortcode add-on
 * @param {type} w
 * @param {type} $
 * @file shortcode.label.js
 * @returns {undefined}
 */
(function (w, $) {

    /* Blockquotes shortcode class */
    var _blockquotes = {
        name: 'Blockquotes shortcode add-on',
        /* Selector container */
        _elements: {
            type: "#zo2-sc-blockquotes-type",
            author: "#zo2-sc-blockquotes-author",
            link: "#zo2-sc-blockquotes-author-link",
            content: "#zo2-sc-blockquotes-content",
            extraClass: "#zo2-sc-blockquotes-class"
        },
        /**
         * Init function
         * @returns {undefined}
         */
        _init: function () {
            var _self = this;
            $(_self._elements.author + ', '
                    + _self._elements.link + ', '
                    + _self._elements.content + ', '
                    + _self._elements.extraClass).on('keyup', function () {
                _self._update();
            });
            $(_self._elements.type).on('change', function () {
                _self._update();
            });
        },
        /**
         * Update shortcode
         * @returns {undefined}
         */
        _update: function () {
            var author = $(this._elements.author).val();
            var link = $(this._elements.link).val();
            var content = $(this._elements.content).val();
            var extraClass = $(this._elements.extraClass).val();
            var type = $(this._elements.type).val();
            var shortcode = '[zt_blockquotes';
            shortcode += (author !== '') ? ' author="' + author + '"' : '';
            shortcode += (link !== '') ? ' link="' + link + '"' : '';
            shortcode += (extraClass !== '') ? ' extra-class="' + extraClass + '"' : '';
            shortcode += (type !== '') ? ' type="' + type + '"' : '';
            shortcode += ']' + content + '[/zt_blockquotes]';
            w.zo2.shortcode.value(shortcode);
        }
    };

    /* Append to shortcode add-ons */
    w.zo2.shortcode._addOn.push(_blockquotes);

})(window, jQuery);