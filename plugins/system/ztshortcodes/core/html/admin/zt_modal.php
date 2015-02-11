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

$prefix = 'zo2-sc-modal';
?>

<form>
    <div class="form-group clearfix">
        <label for="<?php echo $prefix.'id'; ?>">ID</label>
        <input type="text" class="form-control" id="<?php echo $prefix.'id'; ?>" placeholder="Enter id modal">
    </div>
    <div class="form-group clearfix">
        <label for="<?php echo $prefix.'title'; ?>">Title</label>
        <input type="text" class="form-control" id="<?php echo $prefix.'title'; ?>" placeholder="Enter title modal">
    </div>
    <div class="form-group clearfix">
        <label for="<?php echo $prefix.'button-type'; ?>">Button Type</label>
        <select id="<?php echo $prefix.'button-type'; ?>" class="form-control">
            <option value="primary">Primary</option>
            <option value="success">Success</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="danger">Danger</option>
            <option value="link">link</option>
        </select>
    </div>
    <div class="form-group clearfix">
        <label for="<?php echo $prefix.'button-size'; ?>">Button Size</label>
        <select id="<?php echo $prefix.'button-size'; ?>" class="form-control">
            <option value="xs">XSmall</option>
            <option value="sm">Small</option>
            <option value="lg">Large</option>
        </select>
    </div>
    <div class="form-group clearfix">
        <label for="<?php echo $prefix.'button-text'; ?>">Button Text</label>
        <input type="text" class="form-control" id="<?php echo $prefix.'button-text'; ?>" placeholder="Enter Button Text">
    </div>
</form>