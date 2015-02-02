<?php
$prefix = 'zo2-sc-';
?>

<div class="shortcode-element-title">
    <h3>Tabs Content</h3>
</div>
<form>
    <div class="form-group">
        <label for="<?php echo $prefix.'tab-title' ?>">Title</label>
        <input type="text" class="form-control" id="<?php echo $prefix.'label-name' ?>" placeholder="Enter title">
    </div>
    <div class="form-group">
        <label for="<?php echo $prefix.'content-tab'; ?>">Content Tab</label>
        <textarea placeholder="Content Tabs" rows="3" class="form-control" id="<?php echo $prefix.'content-tab'; ?>"></textarea>
    </div>
    <div class="checkbox">
        <label>
            <input type="checkbox" id="<?php echo $prefix.'tab-active'; ?>"> Active
        </label>
    </div>
    <button class="btn btn-default" type="button" id="<?php echo $prefix.'new-tab' ?>">Add New Tab</button>
    <div class="form-insert">
        <button type="button" id="<?php echo $prefix.'insert-label'; ?>" class="btn btn-primary button-insert-shortcode">Insert Shortcode</button>
    </div>
</form>