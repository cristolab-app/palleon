<?php
// filepath: template-parts/panel-parts/templates.php
// Panel de selección directa de plantillas (grid de miniaturas)
$mytemplates = PalleonSettings::get_option('allow_json','enable'); 
$perpage = PalleonSettings::get_option('tp_pagination',21);  
$myperpage = PalleonSettings::get_option('mytp_pagination',10);

// Verificar módulo habilitado
if (PalleonSettings::get_option('module_templates', 'enable') === 'enable'):
    // Obtener paginación
    $perpage = PalleonSettings::get_option('tp_pagination', 21);
    // Cargar plantillas
    $templates = palleon_get_templates(false);
?>
<div id="palleon-templates" class="palleon-icon-panel-content panel-hide">
<div class="palleon-tabs">
                            <ul class="palleon-tabs-menu" style="margin: 0px 0 61px;">
                                <li class="active" data-target="#palleon-all-templates"><?php echo esc_html__('All', 'palleon'); ?></li>
                                <?php if (is_user_logged_in()) { ?>
                                <li data-target="#palleon-templates-favorites"><?php echo esc_html__('My Favorites', 'palleon'); ?></li>
                                <?php } ?>
                                <?php if ($mytemplates == 'enable' && is_user_logged_in()) { ?>
                                <li data-target="#palleon-my-templates-tab"><?php echo esc_html__('My Templates', 'palleon'); ?></li>
                                <?php } ?>
                            </ul>
                            <div id="palleon-all-templates" class="palleon-tab active">
                                <div class="palleon-templates-menu-wrap">
                                    <input id="palleon-template-search-keyword" type="search" class="palleon-form-field" placeholder="<?php echo esc_html__('Search by keyword...', 'palleon'); ?>" autocomplete="off" />
                                    <select id="palleon-templates-menu" class="palleon-select palleon-select2" autocomplete="off">
                                        <option value="all" selected><?php echo esc_html__('All Tags', 'palleon') . ' (' . palleon_get_template_count() . ')'; ?></option>
                                        <?php 
                                        $getTags = palleon_get_template_tags();
                                        foreach($getTags as $slug => $name) {
                                            echo '<option value="' . esc_attr($slug) . '">' . esc_html($name) . '</option>';
                                        }
                                        ?>
                                    </select>
                                    <button id="palleon-template-search" type="button" class="palleon-btn primary"><span class="material-icons">search</span></button>
                                </div>
                                <div class="palleon-templates-content">
                                    <div class="palleon-grid-wrap">
                                        <div id="palleon-templates-grid" class="palleon-grid template-grid template-selection paginated" data-perpage="<?php echo esc_attr($perpage); ?>">
                                            <?php 
                                            $user_fav = get_user_meta(get_current_user_id(), 'palleon_template_fav',true);
                                            if (empty($user_fav)) {
                                                $user_fav = array();
                                            }
                                            $getTemplates = palleon_get_templates(false);
                                            foreach($getTemplates as $template) { 
                                            $btn_class = '';
                                            $icon = 'star_border';
                                            if (in_array($template[0], $user_fav)) {
                                                $btn_class = 'favorited';
                                                $icon = 'star';
                                            }
                                            $template_version = 'free';
                                            if (isset($template[5])) {
                                                $template_version = $template[5]; 
                                            }
                                            ?>
                                            <div class="grid-item">
                                                <?php if ($template_version == 'pro') { ?>
                                                <div class="template-pro"><span class="material-icons">workspace_premium</span></div>
                                                <?php } ?>
                                                <div class="template-favorite"><button type="button" class="palleon-btn-simple star <?php echo esc_attr($btn_class); ?>" data-templateid="<?php echo esc_attr($template[0]); ?>"><span class="material-icons"><?php echo esc_html($icon); ?></span></button></div>
                                                <div class="palleon-masonry-item-inner palleon-select-template" data-json="<?php echo esc_url($template[3]); ?>" data-version="<?php echo esc_attr($template_version); ?>">
                                                    <div class="palleon-img-wrap">
                                                        <div class="palleon-img-loader"></div>
                                                        <img class="lazy" data-src="<?php echo esc_url($template[2]); ?>" data-title="<?php echo esc_attr($template[1]); ?>" data-preview="<?php echo esc_url($template[6]); ?>" />
                                                    </div>
                                                    <div class="palleon-masonry-item-desc">
                                                    <?php echo esc_html($template[1]); ?>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php } ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php if (is_user_logged_in()) { ?>
                            <div id="palleon-templates-favorites" class="palleon-tab">
                                <div id="palleon-templates-favorites-grid" class="palleon-grid template-grid template-selection paginated" data-perpage="<?php echo esc_attr($perpage); ?>">
                                    <?php 
                                    $templates = palleon_get_templates(false);
                                    $user_fav = get_user_meta(get_current_user_id(), 'palleon_template_fav',true);
                                    if (!empty($user_fav)) {
                                        foreach($templates as $template) { 
                                            if (in_array($template[0], $user_fav)) { 
                                                $template_version = 'free';
                                                if (isset($template[5])) {
                                                    $template_version = $template[5]; 
                                                }
                                            ?>
                                            <div class="grid-item">
                                                <?php if ($template_version == 'pro') { ?>
                                                <div class="template-pro"><span class="material-icons">workspace_premium</span></div>
                                                <?php } ?>
                                                <div class="template-favorite"><button type="button" class="palleon-btn-simple star favorited" data-templateid="<?php echo esc_url($template[0]); ?>"><span class="material-icons">star</span></button></div>
                                                <div class="palleon-masonry-item-inner palleon-select-template" data-json="<?php echo esc_url($template[3]); ?>" data-version="<?php echo esc_attr($template_version); ?>">
                                                    <div class="palleon-img-wrap">
                                                        <div class="palleon-img-loader"></div>
                                                        <img class="lazy" data-src="<?php echo esc_url($template[2]); ?>" data-title="<?php echo esc_attr($template[1]); ?>" data-preview="<?php echo esc_url($template[6]); ?>" />
                                                    </div>
                                                    <div class="palleon-masonry-item-desc">
                                                    <?php echo esc_html($template[1]); ?>
                                                    </div>
                                                </div>
                                            </div>  
                                        <?php }
                                        }
                                    } else {
                                        echo '<div class="notice notice-info"><h6>' . esc_html__( 'No favorites yet', 'palleon' ) . '</h6>' . esc_html__('Click the star icon on any template, and you will see it here next time you visit.', 'palleon') . '</div>';
                                    }
                                    ?>
                                </div>
                            </div>
                            <?php } ?>
                    <?php if ($mytemplates == 'enable' && is_user_logged_in()) { ?>
                    <div id="palleon-my-templates-tab" class="palleon-tab">
                    <div id="palleon-my-templates-menu">
                        <div class="palleon-search-box">
                            <input type="search" class="palleon-form-field" placeholder="<?php echo esc_html__('Search by title...', 'palleon'); ?>" autocomplete="off" />
                            <button id="palleon-my-templates-search" type="button" class="palleon-btn primary"><span class="material-icons">search</span></button>
                        </div>
                    </div>
                    <ul id="palleon-my-templates" class="palleon-template-list template-selection paginated" data-perpage="<?php echo esc_attr($myperpage); ?>"></ul>
                    <div id="palleon-my-templates-noimg" class="notice notice-warning d-none"><?php echo esc_html__('Nothing found.', 'palleon'); ?></div>
                </div>    
                <?php } ?>
                 <?php if ($mytemplates == 'enable' && is_user_logged_in()) { ?>
                    <div id="palleon-my-templates-tab" class="palleon-tab">
                    <div id="palleon-my-templates-menu">
                        <div class="palleon-search-box">
                            <input type="search" class="palleon-form-field" placeholder="<?php echo esc_html__('Search by title...', 'palleon'); ?>" autocomplete="off" />
                            <button id="palleon-my-templates-search" type="button" class="palleon-btn primary"><span class="material-icons">search</span></button>
                        </div>
                    </div>
                    <ul id="palleon-my-templates" class="palleon-template-list template-selection paginated" data-perpage="<?php echo esc_attr($myperpage); ?>"></ul>
                    <div id="palleon-my-templates-noimg" class="notice notice-warning d-none"><?php echo esc_html__('Nothing found.', 'palleon'); ?></div>
                </div>    
                <?php } ?>
                        </div>
                       
</div>
                <?php endif; ?>

<script>
;(function(){
  'use strict';
  const canvas = document.querySelector('#palleon-canvas-wrap canvas');
  if (!canvas) return;
  const targetW = canvas.width, targetH = canvas.height;
  const items = document.querySelectorAll('#palleon-templates-grid .grid-item');
  items.forEach(item => {
    const url = item.dataset.json;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // JSON debe incluir width y height
        if (data.width === targetW && data.height === targetH) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      })
      .catch(() => { /* si falla, mostrar*/ item.style.display = '' });
  });
})();
</script>
