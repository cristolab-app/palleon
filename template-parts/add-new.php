<?php 
$perpage = PalleonSettings::get_option('tp_pagination',21);  
$myperpage = PalleonSettings::get_option('mytp_pagination',10);
$templates = PalleonSettings::get_option('module_templates', 'enable'); 
$mytemplates = PalleonSettings::get_option('allow_json','enable');  
$frontend =  PalleonSettings::get_option('fe_editor', 'disable');
$fe_slug =  PalleonSettings::get_option('fe_slug', 'palleon');
$share =  PalleonSettings::get_option('share', 'enable');
$canvas_sizes =  PalleonSettings::get_option('blank_canvas_sizes', '');
$ml_button =  PalleonSettings::get_option('hide_ml_btns', 'show');
?>
<div id="modal-add-new" class="palleon-modal">
    <div class="palleon-modal-close" data-target="#modal-add-new"><span class="material-icons">close</span></div>
    <div class="palleon-modal-wrap">
        <div class="palleon-modal-inner large">
            <div class="palleon-tabs">
                <ul class="palleon-tabs-menu">
                    <li class="active" data-target="#modal-blank-canvas"><span class="material-icons">texture</span><?php echo esc_html__('Blank Canvas', 'palleon'); ?></li>
                    <?php if ($templates == 'enable') { ?>
                    <li data-target="#modal-template-library"><span class="material-icons">photo_library</span><?php echo esc_html__('Template Library', 'palleon'); ?></li>
                    <?php } ?>
                </ul>
                <div id="modal-blank-canvas" class="palleon-tab active">
                    <div class="palleon-control-group">
                        <div>
                            <label><?php echo esc_html__('Size', 'palleon'); ?></label>
                            <select id="palleon-canvas-size-select" class="palleon-select" autocomplete="off">
                                <option selected value="custom" data-width="800" data-height="800"><?php echo esc_html__('Custom', 'palleon'); ?></option>
                                <?php if (empty($canvas_sizes)) { ?>
                                <option value="" data-width="2240" data-height="1260"><?php echo esc_html__('Blog Banner', 'palleon'); ?></option>
                                <option value="" data-width="851" data-height="315"><?php echo esc_html__('Facebook Cover', 'palleon'); ?></option>
                                <option value="" data-width="1200" data-height="628"><?php echo esc_html__('Facebook Ad', 'palleon'); ?></option>
                                <option value="" data-width="1080" data-height="1080"><?php echo esc_html__('Instagram Post', 'palleon'); ?></option>
                                <option value="" data-width="750" data-height="1120"><?php echo esc_html__('Pinterest Post', 'palleon'); ?></option>
                                <option value="" data-width="940" data-height="788"><?php echo esc_html__('Facebook Post', 'palleon'); ?></option>
                                <option value="" data-width="1600" data-height="900"><?php echo esc_html__('Twitter Post', 'palleon'); ?></option>
                                <option value="" data-width="1280" data-height="720"><?php echo esc_html__('Youtube Thumbnail', 'palleon'); ?></option>
                                <option value="" data-width="1920" data-height="1080"><?php echo esc_html__('Wallpaper', 'palleon'); ?></option>
                                <?php } else if (!empty($canvas_sizes) && is_array($canvas_sizes)) {
                                    foreach ( $canvas_sizes as $key => $entry ) {
                                        $name = $width = $height = '';
                                        if ( isset( $entry['name'] ) ) {
                                            $name = esc_html( $entry['name'] );
                                        }
                                        if ( isset( $entry['width'] ) ) {
                                            $width = esc_attr( $entry['width'] );
                                        }
                                        if ( isset( $entry['height'] ) ) {
                                            $height = esc_attr( $entry['height'] );
                                        }
                                        echo '<option value="" data-width="' . $width . '" data-height="' . $height . '">' . $name . '</option>';
                                    }
                                }
                                ?>
                            </select>
                        </div>
                        <div>
                            <label><?php echo esc_html__('Width', 'palleon'); ?></label>
                            <input id="palleon-canvas-width" class="palleon-form-field" type="number" value="800" data-min="1" data-max="10000" autocomplete="off">
                        </div>
                        <div>
                            <label><?php echo esc_html__('Height', 'palleon'); ?></label>
                            <input id="palleon-canvas-height" class="palleon-form-field" type="number" value="800" data-min="1" data-max="10000" autocomplete="off">
                        </div>
                        <div>
                            <label><?php echo esc_html__('Background', 'palleon'); ?></label>
                            <input id="palleon-canvas-color" type="text" class="palleon-colorpicker allow-empty" autocomplete="off" value="" />
                        </div>
                        <div>
                            <button id="palleon-canvas-create" type="button" class="palleon-btn primary"><span class="material-icons">done</span><?php echo esc_html__('Create', 'palleon'); ?></button>
                        </div>
                    </div>
                    <?php Palleon::ad_manager('blank-canvas'); ?>
                </div>
                <?php if ($templates == 'enable') { ?>
                <div id="modal-template-library" class="palleon-tab">
                    <div class="palleon-templates-wrap">
                        <div class="palleon-tabs">
                            <ul class="palleon-tabs-menu">
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
                        </div>
                    </div>
                </div>
                <?php } ?>
                <?php do_action('palleon_add_new_tab'); ?>
            </div>
        </div>
    </div>
</div>