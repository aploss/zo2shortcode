<?php
/**
 * Zo2 Shortcodes (http://www.zo2framework.org)
 *
 * @link        http://www.zo2framework.org
 * @link        http://github.com/aploss/zo2
 * @author      ZooTemplate <http://zootemplate.com>
 * @copyright   Copyright (c) 2013 APL Solutions (http://apl.vn)
 * @license     GPL v2
 */
defined('_JEXEC') or die('Restricted access');

global $zo2Shortcodes;
$zo2Shortcodes['tabs'][$shortcode->options['id']]['options'] = $shortcode->get('options');
$shortcode->set('tag', 'tab');
$parser = new JBBCode\Parser();
$builder = new JBBCode\CodeDefinitionBuilder($shortcode->get('tag'), $shortcode->get('tag'));
$builder->setUseOption(true);
$parser->addCodeDefinition($builder->build()->setShortcode($shortcode));
// Parse this sub content
$parser->parse($this->get('content'));
$parser->getAsHTML();
?>

<?php
if (isset($zo2Shortcodes['tabs'][$shortcode->options['id']]))
{
    $currentTab = $zo2Shortcodes['tabs'][$shortcode->options['id']];
    $id = $shortcode->options['id'];
}
?>  

<?php if (!empty($currentTab)) : ?>
    <div class="zo2-tabs">
        <ul id="zo2Tab<?php echo $id; ?>" class="nav nav-tabs">
            <?php foreach ($currentTab['tabs'] as $key => $tab): ?> 
                <?php $option = new JObject($tab); ?>             
                <li class="<?php echo ($option->get('active') == 'true') ? 'active' : ''; ?>"><a href="#tab<?php echo $id . $key; ?>" data-toggle="tab"><?php echo $option->get('title'); ?></a></li>              
            <?php endforeach; ?>
        </ul>
        <div id="zo2TabContent<?php echo $id; ?>" class="tab-content">
            <?php foreach ($currentTab['contents'] as $key => $content): ?>    
                <?php $option = new JObject($currentTab['tabs'][$key]); ?>
                <div class="tab-pane fade <?php echo ($option->get('active') == 'true') ? 'in active' : ''; ?>" id="tab<?php echo $id . $key; ?>">
                    <?php echo $content; ?>
                </div>
            <?php endforeach; ?>

        </div>
    </div>
<?php endif; ?>