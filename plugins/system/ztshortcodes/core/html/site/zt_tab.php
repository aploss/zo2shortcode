<?php

/**
 * ZT Shortcodes
 * A powerful Joomla plugin to help effortlessly customize your own content and style without HTML code knowledge
 *
 * @version     1.0.0
 * @author      ZooTemplate 
 * @email       support@zootemplate.com 
 * @link        http://www.zootemplate.com 
 * @copyright   Copyright (c) 2015 ZooTemplate
 * @license     GPL v2
 */
defined('_JEXEC') or die('Restricted access');

global $zo2Shortcodes;

$zo2Shortcodes['tabs'][$shortcode->options['id']]['tabs'][] = $shortcode->options;
$zo2Shortcodes['tabs'][$shortcode->options['id']]['contents'][] = $content;