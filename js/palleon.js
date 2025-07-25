! function(e) {
    "use strict";
    e.fn.palleon = function(a) {
        var t, n, l, i, o, r, s = e(this),
            d = document.body.clientWidth,
            c = e.extend({
                fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                fontSize: 60,
                fontWeight: "normal",
                fontStyle: "normal",
                canvasColor: "transparent",
                fill: "#000",
                stroke: "#fff",
                strokeWidth: 0,
                textBackgroundColor: "rgba(255,255,255,0)",
                textAlign: "left",
                lineHeight: 1.2,
                shapeColor: "#fff",
                borderColor: "#000",
                borderDashArray: [4, 4],
                borderOpacityWhenMoving: .5,
                borderScaleFactor: 2,
                editingBorderColor: "rgba(0,0,0,0.5)",
                cornerColor: "#fff",
                cornerSize: 12,
                cornerStrokeColor: "#000",
                cornerStyle: "circle",
                transparentCorners: !1,
                cursorColor: "#000",
                cursorWidth: 2,
                enableGLFiltering: !0,
                textureSize: 4096,
                version: "backend",
                watermark: "none",
                watermarkText: "palleon.website",
                watermarkFontFamily: "Georgia, serif",
                watermarkFontColor: "#000",
                watermarkFontSize: 40,
                watermarkFontWeight: "normal",
                watermarkFontStyle: "normal",
                watermarkStrokeColor: "#FFF",
                watermarkLocation: "bottom-right",
                customFunctions: function() {}
            }, a),
            p = new Localbase("palleonwp"),
            f = 0,
            g = !1,
            m = "none",
            h = "",
            u = "",
            b = "",
            v = "",
            y = 0,
            w = 1,
            k = 1,
            x = "left",
            P = "top",
            j = "",
            C = [],
            I = "",
            S = "",
            T = "",
            A = "",
            O = 0,
            R = [],
            F = "add-to-canvas",
            q = ["circle", "square", "rectangle", "triangle", "ellipse", "trapezoid", "octagon", "pentagon", "emerald", "star", "diamond", "parallelogram", "customShape", "printarea"],
            X = ["square", "rectangle", "triangle", "printarea"],
            Y = [
                ["Helvetica Neue", "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"],
                ["Impact", "Impact, Charcoal, sans-serif"],
                ["Georgia", "Georgia, serif"],
                ["Palatino Linotype", "'Palatino Linotype', 'Book Antiqua', Palatino, serif"],
                ["Times New Roman", "'Times New Roman', Times, serif"],
                ["Arial", "Arial, Helvetica, sans-serif"],
                ["Arial Black", "'Arial Black', Gadget, sans-serif"],
                ["Comic Sans", "'Comic Sans MS', cursive, sans-serif"],
                ["Lucida Sans", "'Lucida Sans Unicode', 'Lucida Grande', sans-serif"],
                ["Tahoma", "Tahoma, Geneva, sans-serif"],
                ["Trebuchet", "'Trebuchet MS', Helvetica, sans-serif"],
                ["Verdana", "Verdana, Geneva, sans-serif"],
                ["Courier New", "'Courier New', Courier, monospace"],
                ["Lucida Console", "'Lucida Console', Monaco, monospace"]
            ],
            W = ["objectType", "gradientFill", "roundedCorders", "mode", "selectable", "lockMovementX", "lockMovementY", "lockRotation", "lockScalingX", "lockScalingY", "crossOrigin", "layerName", "maskType", "ogWidth", "ogHeight"];

        function E() {
            p.collection("assets").get().then(e => {
                if (void 0 === e) E();
                else if (e.length > 0) {
                    var a = 0;
                    s.find("#palleon-my-templates").html("");
                    var t = [];
                    e.forEach(function(e) {
                        t.push({
                            src: e.src,
                            key: e.key,
                            type: e.type,
                            name: e.name
                        })
                    }), t.slice().reverse().forEach(function(e) {
                        if ("json" == e.type) {
                            const t = new Blob([e.src], {
                                    type: "text/plain"
                                }),
                                n = URL.createObjectURL(t);
                            s.find("#palleon-my-templates").append('<li data-keyword="' + e.name + '"> <div>' + e.name + '</div> <div> <button type="button" class="palleon-btn primary palleon-select-template" data-json="' + n + '"><span class="material-icons">check</span>' + palleonParams.select + '</button> <button type="button" class="palleon-btn danger palleon-template-delete" data-target="' + e.key + '"><span class="material-icons">clear</span>' + palleonParams.delete + "</button> </div> </li>"), a++
                        }
                    }), s.find("#palleon-my-templates-pagination").remove(), 0 !== a ? D(s.find("#palleon-my-templates")) : s.find("#palleon-my-templates").html("<li>" + palleonParams.easyAccessTemplate + "</li>")
                } else s.find("#palleon-my-templates-pagination").remove(), s.find("#palleon-my-templates").html("<li>" + palleonParams.easyAccessTemplate + "</li>")
            })
        }
        p.config.debug = !1, E(), s.find(".palleon-template-list").on("click", ".palleon-template-delete", function() {
            var a = e(this).parent().parent(),
                t = e(this).attr("data-target");
            p.collection("assets").doc({
                key: t
            }).get().then(e => {
                p.collection("assets").doc({
                    key: t
                }).delete(), a.remove(), s.find("#palleon-my-templates-pagination").remove(), D(s.find("#palleon-my-templates"))
            })
        }), s.find(".crop-custom").css("display", "none"), e("body").hasClass("edit_attachment") && s.find("#palleon-new").parent().remove();
        for (var z = new LazyLoad({
                callback_loading: a => {
                    e(a).css("visibility", "hidden")
                },
                callback_error: a => {
                    e(a).css("visibility", "visible"), a.setAttribute("src", palleonParams.baseURL + "assets/placeholder.png"), e(a).parent().css("min-height", "auto"), e(a).parent().find(".palleon-img-loader").remove()
                },
                callback_loaded: a => {
                    e(a).css("visibility", "visible"), e(a).parent().css("min-height", "auto"), e(a).parent().find(".palleon-img-loader").remove()
                }
            }), B = 0; B < Y.length; B++) s.find("#websafe-fonts").append(e('<option class="websafe-font"></option>').attr("value", Y[B][1]).text(Y[B][0]).attr("data-font", Y[B][1]).text(Y[B][0]));

        function D(e) {
            var a = e.find(">*"),
                t = a.length,
                n = parseInt(e.data("perpage"));
            if (t > n) {
                a.slice(n).hide();
                var l = '<div id="' + e.attr("id") + '-pagination" class="palleon-pagination"></div>';
                e.after(l), s.find("#" + e.attr("id") + "-pagination").pagination({
                    items: t,
                    itemsOnPage: n,
                    prevText: '<span class="material-icons">navigate_before</span>',
                    nextText: '<span class="material-icons">navigate_next</span>',
                    displayedPages: 4,
                    onPageClick: function(e, t) {
                        void 0 !== t && t.preventDefault();
                        var l = n * (e - 1),
                            i = l + n;
                        a.hide().slice(l, i).show()
                    }
                }), s.find("#" + e.attr("id") + "-pagination").pagination("selectPage", 1)
            }
        }

        function L() {
            f++;
            var e = j.toJSON(W);
            s.find("#palleon-pages > div").removeClass("active"), s.find("#palleon-history-list li").remove(), s.find("#palleon-history").prop("disabled", !0), s.find("#palleon-undo").prop("disabled", !0), s.find("#palleon-redo").prop("disabled", !0), s.find("#palleon-page-" + f + "-json").length > 0 ? (s.find("#palleon-page-" + f + "-json").html(JSON.stringify(e)), s.find("#palleon-pages").find("#" + f).attr("data-origin", e.backgroundImage.src), s.find("#palleon-pages").find("#" + f).trigger("click")) : (s.append('<script id="palleon-page-' + f + '-json" type="text/json">' + JSON.stringify(e) + "<\/script>"), s.find("#palleon-pages").prepend('<div id="' + f + '" class="active" data-origin="' + e.backgroundImage.src + '"><div class="palleon-open-page">' + s.find("#palleon-download-name").val() + '</div><span class="material-icons palleon-delete-page">clear</span></div>')), s.find("#palleon-apps-content > div").addClass("d-none"), s.find("#palleon-apps-menu").show()
        }

        function H(e) {
            for (var a = e.split(","), t = a[0].match(/:(.*?);/)[1], n = atob(a[1]), l = n.length, i = new Uint8Array(l); l--;) i[l] = n.charCodeAt(l);
            return new Blob([i], {
                type: t
            })
        }

        function G(e, a) {
            var t = new XMLHttpRequest;
            t.onload = function() {
                var e = new FileReader;
                e.onloadend = function() {
                    a(e.result)
                }, e.readAsDataURL(t.response)
            }, t.open("GET", e), t.responseType = "blob", t.send()
        }

        function U() {
            s.removeClass("panel-closed"), s.find(".palleon-icon-menu-btn").removeClass("active"), s.find("#palleon-icon-menu").removeClass("closed"), s.find("#palleon-toggle-left").removeClass("closed"), s.find("#palleon-toggle-left").find(".material-icons").html("chevron_left"), s.find("#palleon-icon-panel").show()
        }

        function M() {
            s.addClass("panel-closed"), s.find(".palleon-icon-menu-btn").removeClass("active"), s.find("#palleon-icon-menu").addClass("closed"), s.find("#palleon-toggle-left").addClass("closed"), s.find("#palleon-toggle-left").find(".material-icons").html("chevron_right"), s.find("#palleon-icon-panel").hide()
        }
        e.getJSON(palleonParams.baseURL + "json/google-fonts.json", function(a) {
            for (var t = 0; t < a.items.length; t++) s.find("#google-fonts").append(e('<option class="google-font"></option>').attr("value", a.items[t].family).text(a.items[t].family).attr("data-font", a.items[t].family).text(a.items[t].family))
        }), e.getJSON(palleonParams.baseURL + "json/material-icons.json", function(e) {
            for (var a = palleonParams.sourceURL, t = 0; t < e.categories.length; t++)
                for (var n = e.categories[t], l = 0; l < n.icons.length; l++) {
                    var i = a + "icons/" + n.icons[l].group_id + "/" + n.icons[l].ligature;
                    s.find("#palleon-icons-grid").append('<div class="palleon-element add-element" data-elsource="' + i + '" data-loader="no" title="' + n.icons[l].name + '"><span class="material-icons">' + n.icons[l].ligature + "</div>")
                }
        }), s.find(".palleon-select.palleon-select2").select2({
            theme: "dark",
            width: "100%",
            templateSelection: Xe,
            templateResult: Xe,
            allowHtml: !0
        }), s.find(".palleon-colorpicker.disallow-empty").spectrum({
            allowEmpty: !1,
            showInitial: !0,
            hideAfterPaletteSelect: !0,
            showSelectionPalette: !0,
            localStorageKey: "spectrum.palleon",
            showAlpha: "true" === palleonParams.alphaColor
        }), s.find(".palleon-colorpicker.allow-empty").spectrum({
            allowEmpty: !0,
            showInitial: !1,
            hideAfterPaletteSelect: !0,
            showSelectionPalette: !0,
            localStorageKey: "spectrum.palleon",
            showAlpha: "true" === palleonParams.alphaColor
        }), toastr.options.closeButton = !0, toastr.options.positionClass = "toast-bottom-right", toastr.options.progressBar = !0, toastr.options.newestOnTop = !1, toastr.options.showEasing = "swing", toastr.options.hideEasing = "linear", toastr.options.closeEasing = "linear", s.find("#palleon-canvas-wrap").draggable({
            disabled: !0
        }), s.find(".paginated").each(function() {
            D(e(this))
        }), s.find("#palleon-pages").on("click", ".palleon-open-page", function() {
            var a = e(this).parent();
            if (!a.hasClass("active")) {
                s.find("#palleon-draw-btn").hasClass("active") && s.find("#palleon-draw-btn").trigger("click"), s.find("#palleon-history-list li").remove(), s.find("#palleon-history").prop("disabled", !0), s.find("#palleon-undo").prop("disabled", !0), s.find("#palleon-redo").prop("disabled", !0), s.find("#palleon-canvas-loader").show();
                var t = s.find("#palleon-pages > div.active").attr("id"),
                    n = e(this).parent().attr("id"),
                    l = j.toJSON(W);
                s.find("#palleon-page-" + t + "-json").html(JSON.stringify(l));
                var i = s.find("#palleon-page-" + n + "-json").html();
                e(document).trigger("loadTemplate", [i, "", ""]), s.find("#palleon-pages > div").removeClass("active"), a.addClass("active"), ye(), s.find("#palleon-apps-content > div").addClass("d-none"), s.find("#palleon-apps-menu").show()
            }
        }), s.find("#palleon-pages").on("click", ".palleon-delete-page", function() {
            var a = e(this).parent();
            a.hasClass("active") ? (a.remove(), s.find("#palleon-pages > div").length > 0 ? s.find("#palleon-pages > div:first-child > .palleon-open-page").trigger("click") : (m = "none", ie())) : a.remove()
        }), s.on("change", ".palleon-file-name", function() {
            var a = e(this).val();
            s.find(".palleon-file-name").not(this).each(function() {
                e(this).val(a), s.find("#palleon-pages > div.active > .palleon-open-page").html(a)
            })
        }), s.on("click", "#palleon-new", function() {
            if (s.find("#palleon-pages > div.active").length > 0) {
                var e = s.find("#palleon-pages > div.active").attr("id"),
                    a = j.toJSON(W);
                s.find("#palleon-page-" + e + "-json").html(JSON.stringify(a))
            }
        }), s.on("click", "#palleon-save", function() {
            if (s.find("#palleon-pages > div.active").length > 0) {
                var e = s.find("#palleon-pages > div.active").attr("id"),
                    a = j.toJSON(W);
                s.find("#palleon-page-" + e + "-json").html(JSON.stringify(a))
            }
        }), s.find("#palleon-pages").sortable({
            items: "[data-origin]",
            placeholder: "page-placeholder",
            axis: "x"
        }).disableSelection(), s.find("#palleon-toggle-left").on("click", function() {
            e(this).hasClass("closed") ? U() : M()
        }), s.find("#palleon-toggle-right").on("click", function() {
            e(this).hasClass("closed") ? (s.removeClass("layers-closed"), e(this).removeClass("closed"), e(this).find(".material-icons").html("chevron_right"), s.find("#palleon-right-col").show()) : (s.addClass("layers-closed"), e(this).addClass("closed"), e(this).find(".material-icons").html("chevron_left"), s.find("#palleon-right-col").hide())
        }), s.find(".palleon-toggle-right").on("click", function(e) {
            e.preventDefault(), s.find("#palleon-toggle-right").trigger("click")
        }), d <= 1200 && (s.find("#palleon-toggle-right").trigger("click"), s.find("#palleon-toggle-left").trigger("click")), s.find(".palleon-icon-menu-btn").on("click", function() {
            e(this).data("target") && (e(this).hasClass("active") ? M() : (U(), e(this).addClass("active"), s.find(".palleon-icon-panel-content").addClass("panel-hide"), s.find(e(this).data("target")).removeClass("panel-hide")))
        }), s.find(".palleon-dropdown-wrap").on("click", function() {
            e(this).hasClass("opened") ? (e(this).removeClass("opened"), e(this).find(".palleon-dropdown").hide()) : (e(this).addClass("opened"), e(this).find(".palleon-dropdown").show())
        }), s.find("ul.palleon-accordion > li > a").on("click", function(a) {
            a.preventDefault();
            var t = e(this).parent().parent();
            e(this).parent().hasClass("opened") ? t.find("li").removeClass("opened") : (t.find("li").removeClass("opened"), e(this).parent().addClass("opened"))
        }), s.find(".palleon-lock-unlock").on("click", function() {
            e(this).hasClass("active") ? (e(this).removeClass("active"), e(this).find(".material-icons").html("lock_open")) : (e(this).addClass("active"), e(this).find(".material-icons").html("lock"))
        }), s.find(".palleon-slider").on("input", function() {
            e(this).parent().parent().find(".slider-label span").html(e(this).val()), s.find("span.tm-count-zoom").html(e(this).val())
        }), s.find('input[type="checkbox"]').on("change", function() {
            e(this).data("conditional") && (e(this).is(":checked") ? s.find(e(this).data("conditional")).removeClass("d-none") : s.find(e(this).data("conditional")).addClass("d-none"))
        }), s.on("click", ".palleon-tabs-menu li", function() {
            var a = e(this).data("target"),
                t = e(this).parent().parent();
            t.find("> .palleon-tab").removeClass("active"), e(a).addClass("active"), t.find("> .palleon-tabs-menu li").removeClass("active"), e(this).addClass("active")
        }), s.find("#palleon-media-library-main-menu li").first().trigger("click"), s.find('input[type="number"]:not(.disable-val),.numeric-field').bind("input paste keyup keydown", function() {
            this.value = this.value.replace(/(?!^-)[^0-9.]/g, "").replace(/(\..*)\./g, "$1"), e(this).data("max") && this.value > e(this).data("max") && (this.value = e(this).data("max")), e(this).data("min") && this.value < e(this).data("min") && (this.value = e(this).data("min"))
        }), s.find(".palleon-counter .counter-plus").on("click", function() {
            var a = e(this).parent().find("input.palleon-form-field"),
                t = parseInt(a.val()) + parseInt(a.data("step"));
            a.data("max") && t > a.data("max") && (t = a.data("max")), a.data("min") && t < a.data("min") && (t = a.data("min")), t < 0 && (t = 0), a.val(t), "palleon-img-zoom-in" == e(this).attr("id") && ye(t)
        }), s.find(".palleon-counter .counter-minus").on("click", function() {
            var a = e(this).parent().find("input.palleon-form-field"),
                t = parseInt(a.val()) - parseInt(a.data("step"));
            a.data("max") && t > a.data("max") && (t = a.data("max")), a.data("min") && t < a.data("min") && (t = a.data("min")), t < 0 && (t = 0), a.val(t), "palleon-img-zoom-out" == e(this).attr("id") && ye(t)
        }), s.find(".palleon-wrap").on("click", function(e) {
            if (!g) {
                var a = e.target.id;
                "" != a && "palleon-content" == a && (j.discardActiveObject(), j.requestRenderAll())
            }
        }), fabric.enableGLFiltering = c.enableGLFiltering, fabric.textureSize = parseInt(c.textureSize), fabric.Object.prototype.borderColor = c.borderColor, fabric.Object.prototype.borderDashArray = c.borderDashArray, fabric.Object.prototype.borderOpacityWhenMoving = c.borderOpacityWhenMoving, fabric.Object.prototype.borderScaleFactor = c.borderScaleFactor, fabric.Object.prototype.editingBorderColor = c.editingBorderColor, fabric.Object.prototype.cornerColor = c.cornerColor, fabric.Object.prototype.cornerSize = c.cornerSize, fabric.Object.prototype.cornerStrokeColor = c.cornerStrokeColor, fabric.Object.prototype.cornerStyle = c.cornerStyle, fabric.Object.prototype.transparentCorners = c.transparentCorners, fabric.Object.prototype.cursorColor = c.cursorColor, fabric.Object.prototype.cursorWidth = c.cursorWidth, fabric.Object.prototype.strokeUniform = !0, fabric.Group.prototype.padding = 0, fabric.Object.prototype.erasable = !1, fabric.Canvas.prototype.getItemById = function(e) {
            for (var a = null, t = this.getObjects(), n = 0, l = this.size(); n < l; n++)
                if ("group" == t[n].get("type")) {
                    if (t[n].get("id") && t[n].get("id") === e) {
                        a = t[n];
                        break
                    }
                    for (var i = n, o = 0; o < t[n]._objects.length; o++)
                        if (t[i]._objects[o].id && t[i]._objects[o].id === e) {
                            a = t[i]._objects[o];
                            break
                        }
                } else if (t[n].id && t[n].id === e) {
                a = t[n];
                break
            }
            return a
        };
        var N = document.createElement("img");

        function _(a, t) {
            var n = t.target;
            "activeSelection" === n.type ? (e.each(n._objects, function(e, a) {
                s.find("#palleon-layers #" + a.id).find("a.delete-layer").trigger("click")
            }), j.discardActiveObject()) : s.find("#palleon-layers #" + n.id).find("a.delete-layer").trigger("click")
        }

        function V(e, a, t, n, l) {
            e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(N, -12, -12, 24, 24), e.restore()
        }
        N.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='tm_delete_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='256' cy='256' r='256'/%3E%3Cg%3E%3Crect x='120.001' y='239.987' transform='matrix(-0.7071 -0.7071 0.7071 -0.7071 256.0091 618.0168)' style='fill:%23FFFFFF;' width='271.997' height='32'/%3E%3Crect x='240' y='119.989' transform='matrix(-0.7071 -0.7071 0.7071 -0.7071 256.0091 618.0168)' style='fill:%23FFFFFF;' width='32' height='271.997'/%3E%3C/g%3E%3C/svg%3E";
        var J = document.createElement("img");

        function Z(e, a) {
            var t = a.target;
            "activeSelection" === t.type ? toastr.warning(palleonParams.noDuplicate, palleonParams.warning) : s.find("#palleon-layers #" + t.id).find("a.duplicate-layer").trigger("click")
        }

        function K(e, a, t, n, l) {
            e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(J, -12, -12, 24, 24), e.restore()
        }

        // Imagen del icono de agrupamiento
        var groupIcon = document.createElement("img");
        
        // Imagen del icono de desagrupamiento
        var ungroupIcon = document.createElement("img");

        // Función para manejar el click del control de agrupamiento
        function groupControlHandler(e, a) {
            var t = a.target;
            if ("activeSelection" === t.type) {
                groupSelectedObjects();
            }
        }

        // Función para renderizar el control de agrupamiento
        function renderGroupControl(e, a, t, n, l) {
            e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(groupIcon, -12, -12, 24, 24), e.restore()
        }

        // Función para manejar el click del control de desagrupamiento
        function ungroupControlHandler(e, a) {
            var t = a.target;
            if ("group" === t.type) {
                ungroupSelectedObjects();
            }
        }

        // Función para renderizar el control de desagrupamiento  
        function renderUngroupControl(e, a, t, n, l) {
            e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(ungroupIcon, -12, -12, 24, 24), e.restore()
        }

        // Función para agrupar objetos seleccionados
        function groupSelectedObjects() {
            var activeObject = j.getActiveObject();
            if (activeObject && activeObject.type === 'activeSelection') {
                // Guardar los objetos originales antes de agrupar
                var originalObjects = activeObject._objects.slice();
                
                // Convertir la selección activa en un grupo
                var group = activeObject.toGroup();
                group.set({
                    id: (new Date).getTime(),
                    objectType: 'group'  // Asegurar que tenga el objectType correcto
                });
                
                // Eliminar las capas individuales de los objetos agrupados
                originalObjects.forEach(function(obj) {
                    s.find("#palleon-layers #" + obj.id).remove();
                });
                
                // Actualizar las capas y activar el sorting
                ue();
                j.requestRenderAll();
                
                j.fire("palleon:history", {
                    type: "group",
                    text: palleonParams.grouped || "Objects Grouped"
                });
                
                // Forzar la actualización de controles después del agrupamiento
                setTimeout(function() {
                    var newActiveObject = j.getActiveObject();
                    if (newActiveObject && newActiveObject.type === 'group') {
                        newActiveObject.controls.ungroupControl = new fabric.Control({
                            x: 0,
                            y: .5,
                            offsetY: 22,
                            offsetX: -42,
                            cursorStyle: "pointer",
                            mouseUpHandler: ungroupControlHandler,
                            render: renderUngroupControl,
                            cornerSize: 24
                        });
                        j.requestRenderAll();
                    }
                }, 100);
            }
        }

        // Función para desagrupar objetos
        function ungroupSelectedObjects() {
            var activeObject = j.getActiveObject();
            if (activeObject && activeObject.type === 'group') {
                // Eliminar la capa del grupo
                s.find("#palleon-layers #" + activeObject.id).remove();
                
                // Convertir el grupo de vuelta a selección activa
                var items = activeObject.toActiveSelection();
                
                // Actualizar las capas
                ue();
                j.requestRenderAll();
                
                j.fire("palleon:history", {
                    type: "ungroup", 
                    text: palleonParams.ungrouped || "Objects Ungrouped"
                });
                
                // Forzar la actualización de controles después del desagrupamiento
                setTimeout(function() {
                    var newActiveObject = j.getActiveObject();
                    if (newActiveObject && newActiveObject.type === 'activeSelection') {
                        newActiveObject.controls.groupControl = new fabric.Control({
                            x: 0,
                            y: .5,
                            offsetY: 22,
                            offsetX: -42,
                            cursorStyle: "pointer",
                            mouseUpHandler: groupControlHandler,
                            render: renderGroupControl,
                            cornerSize: 24
                        });
                        j.requestRenderAll();
                    }
                }, 100);
            }
        }

        function $(e, a) {
            "" == e && (e = (new Date).getTime()), "" == a ? a = "jpeg" : ".jpg" == a ? a = "jpeg" : "jpg" == a ? a = "jpeg" : ".png" == a ? a = "png" : ".webp" == a ? a = "webp" : ".tiff" == a && (a = "tiff"), s.find(".palleon-file-name").val(e), s.find(".palleon-file-name").data("default", e), s.find("#palleon-save-img-format").val(a).change(), s.find("#palleon-download-format").val(a).change()
        }

        function Q(e) {
            if (y = 0, s.find("#palleon-canvas-loader").css("display", "flex"), s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible"), m = e, j.backgroundImage && (C = j.backgroundImage.filters), "canvas" == m) {
                s.find("#palleon-canvas-color").trigger("change");
                var a = document.createElement("canvas"),
                    t = new fabric.Canvas(a),
                    n = parseInt(s.find("#palleon-canvas-width").val()),
                    l = parseInt(s.find("#palleon-canvas-height").val());
                "" == n && (n = 800), "" == l && (l = 800), t.setWidth(n), t.setHeight(l), t.backgroundColor = "transparent";
                var i = t.toDataURL({
                    format: "png",
                    enableRetinaScaling: !1
                });
                s.find("#palleon-canvas-img").attr("src", i), t.dispose()
            }
            s.find("#palleon-canvas-img-wrap").imagesLoaded(function() {
                h = s.find("#palleon-canvas-img")[0], u = s.find("#palleon-canvas-img").attr("src"), b = h.width, v = h.height, we(h), j.setDimensions({
                    width: b,
                    height: v
                }), fabric.Image.fromURL(u, function(e) {
                    j.setBackgroundImage(e, j.renderAll.bind(j), {
                        objectType: "BG",
                        mode: m,
                        scaleX: w,
                        scaleY: k,
                        selectable: !1,
                        lockMovementX: !0,
                        lockMovementY: !0,
                        lockRotation: !0,
                        erasable: !0
                    }, {
                        crossOrigin: "anonymous"
                    }), setTimeout(function() {
                        L(), s.find("#palleon-canvas-loader").hide()
                    }, 500)
                }), ye(), ie(), setTimeout(function() {
                    le(), ge('<span class="material-icons">flag</span>' + palleonParams.started)
                }, 500)
            })
        }
        if (J.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='tm_add_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%23009688;' cx='256' cy='256' r='256'/%3E%3Cg%3E%3Crect x='240' y='120' style='fill:%23FFFFFF;' width='32' height='272'/%3E%3Crect x='120' y='240' style='fill:%23FFFFFF;' width='272' height='32'/%3E%3C/g%3E%3C/svg%3E", 
        groupIcon.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='tm_group_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%236658ea;' cx='256' cy='256' r='256'/%3E%3Cg%3E%3Crect x='140' y='180' style='fill:%23FFFFFF;' width='120' height='120' rx='10'/%3E%3Crect x='252' y='180' style='fill:%23FFFFFF;' width='120' height='120' rx='10'/%3E%3Crect x='140' y='212' style='fill:%23FFFFFF;' width='120' height='120' rx='10'/%3E%3Crect x='252' y='212' style='fill:%23FFFFFF;' width='120' height='120' rx='10'/%3E%3C/g%3E%3C/svg%3E", 
        ungroupIcon.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='tm_ungroup_btn' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Ccircle style='fill:%23ff9800;' cx='256' cy='256' r='256'/%3E%3Cg%3E%3Crect x='120' y='160' style='fill:%23FFFFFF;' width='100' height='100' rx='8'/%3E%3Crect x='292' y='160' style='fill:%23FFFFFF;' width='100' height='100' rx='8'/%3E%3Crect x='120' y='252' style='fill:%23FFFFFF;' width='100' height='100' rx='8'/%3E%3Crect x='292' y='252' style='fill:%23FFFFFF;' width='100' height='100' rx='8'/%3E%3C/g%3E%3C/svg%3E", 
        fabric.Image.filters.Shift = fabric.util.createClass(fabric.Image.filters.ColorMatrix, {
                type: "Shift",
                matrix: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                mainParameter: !1,
                colorsOnly: !0
            }), t = s.find("#palleon-canvas")[0], (j = new fabric.Canvas(t)).backgroundColor = c.canvasColor, e(document).on("loadBase64Img", function(e, a, t, n = !0) {
                y = 0, s.find("#palleon-canvas-loader").css("display", "flex"), s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible"), m = "image", j.backgroundImage && (C = j.backgroundImage.filters), s.find("#palleon-canvas-img").attr("src", a), s.find("#palleon-canvas-img-wrap").imagesLoaded(function() {
                    h = s.find("#palleon-canvas-img")[0], b = h.width, v = h.height, $(t, "png"), we(h), j.setDimensions({
                        width: b,
                        height: v
                    }), j.setBackgroundImage(a, j.renderAll.bind(j), {
                        objectType: "BG",
                        mode: m,
                        scaleX: w,
                        scaleY: k,
                        selectable: !1,
                        lockMovementX: !0,
                        lockMovementY: !0,
                        lockRotation: !0,
                        erasable: !0
                    }, {
                        crossOrigin: "anonymous"
                    }), ye(), ie(), setTimeout(function() {
                        n ? (le(), L(), ge('<span class="material-icons">flag</span>' + palleonParams.started)) : ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited), s.find("#palleon-canvas-loader").hide()
                    }, 500)
                })
            }), e(document).on("loadImgURL", function(e, a, t) {
                s.find("#palleon-canvas-loader").css("display", "flex"), s.find("#palleon-canvas-wrap").css("visibility", "visible");
                var n = a,
                    l = new Image,
                    i = (new Date).getTime();
                if ("add-to-canvas" == F) $(i, t), G(n, function(e) {
                    l.src = e, l.onload = function() {
                        s.find("#palleon-canvas-img").attr("src", e), Q("image")
                    }
                });
                else if ("add-as-object" == F) {
                    var o = Re()[1] / 2,
                        r = Re()[0] / 2;
                    (d = j.getObjects().filter(e => "printarea" == e.objectType)[0]) && (o = d.top, r = d.left), G(n, function(e) {
                        l.src = e, l.onload = function() {
                            var e = new fabric.Image(l, {
                                objectType: "image",
                                objectCaching: !0,
                                roundedCorders: 0,
                                stroke: "#fff",
                                strokeWidth: 0,
                                top: o,
                                left: r,
                                originX: "center",
                                originY: "center"
                            });
                            e.set({
                                ogWidth: e.get("width"),
                                ogHeight: e.get("height")
                            }), j.add(e), d ? (e.scaleToWidth(.8 * d.width * j.getZoom()), e.isContainedWithinObject(d) || e.scaleToHeight(.8 * d.height * j.getZoom())) : (e.scaleToWidth(Re()[0] / 4), e.isPartiallyOnScreen() && e.scaleToHeight(Re()[1] / 4)), j.setActiveObject(e), j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                                type: "image",
                                text: palleonParams.added
                            })
                        }
                    })
                } else if ("replace-image" == F) G(n, function(e) {
                    l.src = e, l.onload = function() {
                        j.getActiveObject().setSrc(e), j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                            type: "image",
                            text: palleonParams.replaced
                        })
                    }
                });
                else if ("overlay-image" == F) G(n, function(e) {
                    l.src = e, l.onload = function() {
                        var e = new fabric.Image(l);
                        e.set({
                            scaleX: Re()[0] / e.width,
                            scaleY: Re()[1] / e.height,
                            objectCaching: !1,
                            originX: "left",
                            originY: "top",
                            selectable: !1,
                            lockMovementX: !0,
                            lockMovementY: !0,
                            lockRotation: !0,
                            erasable: !0
                        }), j.setOverlayImage(e, j.renderAll.bind(j)), s.find("#palleon-overlay-wrap").show(), s.find("#palleon-overlay-preview").attr("src", n), setTimeout(function() {
                            s.find("#palleon-canvas-loader").hide()
                        }, 500)
                    }
                });
                else if ("agama-bg-image" == F) {
                    var d;
                    (d = j.getObjects().filter(e => "printarea" == e.objectType)[0]) && (s.find("#agama-bg-delete").trigger("click"), G(n, function(e) {
                        l.src = e, l.onload = function() {
                            var e = new fabric.Image(l);
                            e.scaleToWidth(d.width / 2);
                            var a = new fabric.StaticCanvas;
                            a.setDimensions({
                                width: e.getScaledWidth(),
                                height: e.getScaledHeight()
                            }), a.add(e), a.renderAll();
                            var t = new fabric.Pattern({
                                source: a.getElement(),
                                repeat: "repeat",
                                offsetX: 0,
                                offsetY: 0,
                                angle: 0
                            });
                            d.clone(function(e) {
                                e.set({
                                    id: (new Date).getTime(),
                                    objectType: "clipPath",
                                    objectCaching: !1,
                                    fill: t,
                                    selectable: !1,
                                    lockMovementX: !0,
                                    lockMovementY: !0,
                                    lockRotation: !0,
                                    erasable: !1,
                                    stroke: "transparent",
                                    strokeWidth: 0
                                }), j.add(e), j.sendToBack(e), j.sendToBack(d)
                            }), s.find("#agama-bg-width").val(Math.round(parseInt(e.getScaledWidth()))), s.find("#agama-bg-width").attr("min", Math.round(parseInt(e.getScaledWidth()) / 4)), s.find("#agama-bg-width").attr("max", Math.round(4 * parseInt(e.getScaledWidth()))), s.find("#agama-bg-offset-x").val(0), s.find("#agama-bg-offset-x").attr("max", Math.round(4 * parseInt(e.getScaledWidth()))), s.find("#agama-bg-offset-y").val(0), s.find("#agama-bg-offset-y").attr("max", Math.round(4 * parseInt(e.getScaledHeight()))), s.find("#agama-bg-width").trigger("input"), s.find("#agama-bg-offset-x").trigger("input"), s.find("#agama-bg-offset-y").trigger("input"), s.find("#agama-bg-image-settings").show(), s.find("#agama-bg-delete").show(), document.getElementById("agama-bg-width").oninput = function() {
                                e.scaleToWidth(parseInt(this.value, 10)), a.setDimensions({
                                    width: e.getScaledWidth(),
                                    height: e.getScaledHeight()
                                }), j.requestRenderAll()
                            }, document.getElementById("agama-bg-offset-x").oninput = function() {
                                t.offsetX = parseInt(this.value, 10), j.requestRenderAll()
                            }, document.getElementById("agama-bg-offset-y").oninput = function() {
                                t.offsetY = parseInt(this.value, 10), j.requestRenderAll()
                            }, setTimeout(function() {
                                j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                                    type: "image",
                                    text: palleonParams.added
                                })
                            }, 500)
                        }
                    }))
                }
                s.find("#modal-media-library").hide()
            }), "" != s.find("#palleon-canvas-img").attr("src")) {
            m = "image";
            var ee = s.find("#palleon-canvas-img").data("filename"),
                ae = s.find("#palleon-canvas-img").attr("src").match(/\.[0-9a-z]+$/i)[0].replace(/\./g, "");
            $(ee, ae), Q(m)
        }
        if (ie(), "" != s.find("#palleon-canvas-img").data("template")) {
            var te = palleonParams.proTemplate;
            if ("frontend" == palleonParams.version && "pro" == te) toastr.warning(palleonParams.proInfo, palleonParams.proInfoTitle);
            else if ("backend" == palleonParams.version && "pro" == te && "yes" != palleonParams.proCheck) toastr.warning(palleonParams.upgradeInfo, palleonParams.upgradeInfoTitle);
            else {
                ee = s.find("#palleon-canvas-img").data("filename");
                s.find("#palleon-canvas-loader").css("display", "flex"), s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible"), s.find(".palleon-modal").hide();
                var ne = j.getObjects();
                ne.filter(e => "BG" != e.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers li").remove(), ue(), e.getJSON(s.find("#palleon-canvas-img").data("template"), function(e) {
                    oe(e), setTimeout(function() {
                        $(ee, ""), L(), ge('<span class="material-icons">flag</span>' + palleonParams.started)
                    }, 500)
                }).fail(function(e, a, t) {
                    toastr.error("Request Failed: " + t, palleonParams.error)
                }).always(function() {
                    s.find("#palleon-canvas-loader").hide()
                })
            }
        }

        function le() {
            (y = 0, w = 1, k = 1, x = "left", P = "top", void 0 !== j.overlayImage && null !== j.overlayImage && (j.overlayImage = null), s.find("#keep-data").is(":checked")) ? (j.backgroundImage.filters = C, j.backgroundImage.applyFilters()) : (j.backgroundImage.filters = [], s.find("#palleon-adjust .conditional-settings").addClass("d-none"), s.find("#palleon-brightness").prop("checked", !1), s.find("#brightness").val(0), s.find("#palleon-contrast").prop("checked", !1), s.find("#contrast").val(0), s.find("#palleon-saturation").prop("checked", !1), s.find("#saturation").val(0), s.find("#palleon-hue").prop("checked", !1), s.find("#hue").val(0), s.find("#palleon-filters input[type=checkbox]").prop("checked", !1), s.find("#palleon-gamma").prop("checked", !1), s.find("#gamma-red").val(1), s.find("#gamma-green").val(1), s.find("#gamma-blue").val(1), s.find("#palleon-blend-color").prop("checked", !1), s.find("#blend-color-mode").val("add"), s.find("#blend-color-color").spectrum("set", "#ffffff"), s.find("#blend-color-alpha").val(.5), s.find("#blend-color-alpha").parent().parent().find(".slider-label span").html(.5), s.find("#palleon-duotone-color").prop("checked", !1), s.find("#duotone-light-color").spectrum("set", "green"), s.find("#duotone-dark-color").spectrum("set", "blue"), s.find("#palleon-swap-colors").prop("checked", !1), s.find("#palleon-blur").prop("checked", !1), s.find("#blur").val(0), s.find("#palleon-noise").prop("checked", !1), s.find("#noise").val(0), s.find("#palleon-pixelate").prop("checked", !1), s.find("#pixelate").val(1), j.getObjects().filter(e => "BG" != e.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers li").remove(), ue());
            j.fire("selection:cleared"), j.requestRenderAll()
        }

        function ie() {
            "none" == m ? (s.find("#palleon-icon-menu, #palleon-icon-panel, #palleon-ruler-icon").css("pointer-events", "none"), s.find("#modal-add-new .palleon-modal-close").hide(), s.find("#modal-media-library .palleon-modal-close").hide(), s.find("#modal-add-new").show(), s.find("#palleon-modal-onstart").show(), s.find("#palleon-save").prop("disabled", !0), s.find("#palleon-canvas-selected").val("")) : (s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible"), s.find("#palleon-icon-menu, #palleon-icon-panel, #palleon-ruler-icon").css("pointer-events", "auto"), s.find("#modal-add-new .palleon-modal-close").show(), s.find("#modal-media-library .palleon-modal-close").show(), s.find("#modal-add-new").hide(), s.find("#palleon-modal-onstart").hide(), s.find("#palleon-save").prop("disabled", !1)), "canvas" == m ? s.find(".hide-on-canvas-mode").hide() : s.find(".hide-on-canvas-mode").show()
        }

        function oe(a) {
            s.find("#palleon-canvas-loader").css("display", "flex"), y = a.backgroundImage.angle, w = a.backgroundImage.scaleX, k = a.backgroundImage.scaleY, x = a.backgroundImage.originX, P = a.backgroundImage.originY, j.clear(), s.find("#palleon-layers li").remove(), m = a.backgroundImage.mode;
            var t = H(a.backgroundImage.src);
            u = URL.createObjectURL(t), s.find("#palleon-canvas-img").attr("src", u), b = a.backgroundImage.width, v = a.backgroundImage.height;
            for (var n = {
                    width: b,
                    height: v
                }, l = 0; l < a.objects.length; l++) "textbox" == a.objects[l].objectType && (a.objects[l].fontFamily = a.objects[l].fontFamily + "-palleon", a.objects[l].realFontSize = a.objects[l].fontSize, a.objects[l].fontSize = 1);
            j.loadFromJSON(a, function() {
                var a = j.getObjects(),
                    t = a.filter(e => "textbox" == e.objectType),
                    n = a.filter(e => "drawing" == e.objectType);
                e.each(n, function(e, a) {
                    a.setControlsVisibility({
                        mt: !1,
                        mb: !1,
                        ml: !1,
                        mr: !1,
                        bl: !1,
                        br: !1,
                        tl: !1,
                        tr: !1,
                        mtr: !1
                    })
                }), re(t), ue(), s.find("#palleon-canvas-color").spectrum("set", j.backgroundColor), s.find("#custom-image-background").spectrum("set", j.backgroundColor), h = s.find("#palleon-canvas-img")[0], j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:templateLoaded")
            }, function() {}, {
                crossOrigin: "anonymous"
            }), $((new Date).getTime(), ""), we(n), ye(), ie(), j.fire("selection:cleared"), setTimeout(function() {
                var t;
                s.find("#palleon-layers > li").removeClass("active"), a.backgroundImage && (t = a.backgroundImage.filters, s.find("#palleon-brightness").prop("checked", !1), s.find("#palleon-contrast").prop("checked", !1), s.find("#palleon-saturation").prop("checked", !1), s.find("#palleon-hue").prop("checked", !1), s.find("#grayscale").prop("checked", !1), s.find("#sepia").prop("checked", !1), s.find("#brownie").prop("checked", !1), s.find("#blackwhite").prop("checked", !1), s.find("#vintage").prop("checked", !1), s.find("#kodachrome").prop("checked", !1), s.find("#polaroid").prop("checked", !1), s.find("#technicolor").prop("checked", !1), s.find("#invert").prop("checked", !1), s.find("#sharpen").prop("checked", !1), s.find("#emboss").prop("checked", !1), s.find("#palleon-gamma").prop("checked", !1), s.find("#palleon-blend-color").prop("checked", !1), s.find("#palleon-duotone-color").prop("checked", !1), s.find("#palleon-blur").prop("checked", !1), s.find("#palleon-noise").prop("checked", !1), s.find("#palleon-pixelate").prop("checked", !1), 0 !== t.length && e.each(t, function(e, a) {
                    "Brightness" == a.type ? (s.find("#palleon-brightness").prop("checked", !0), s.find("#brightness").val(a.brightness), s.find("#brightness").parent().parent().find(".slider-label span").html(a.brightness)) : "Contrast" == a.type ? (s.find("#palleon-contrast").prop("checked", !0), s.find("#contrast").val(a.brightness), s.find("#contrast").parent().parent().find(".slider-label span").html(a.contrast)) : "Saturation" == a.type ? (s.find("#palleon-saturation").prop("checked", !0), s.find("#saturation").val(a.brightness), s.find("#saturation").parent().parent().find(".slider-label span").html(a.saturation)) : "HueRotation" == a.type ? (s.find("#palleon-hue").prop("checked", !0), s.find("#hue").val(a.rotation), s.find("#hue").parent().parent().find(".slider-label span").html(a.rotation)) : "Grayscale" == a.type ? s.find("#grayscale").prop("checked", !0) : "Sepia" == a.type ? s.find("#sepia").prop("checked", !0) : "Brownie" == a.type ? s.find("#brownie").prop("checked", !0) : "BlackWhite" == a.type ? s.find("#blackwhite").prop("checked", !0) : "Vintage" == a.type ? s.find("#vintage").prop("checked", !0) : "Kodachrome" == a.type ? s.find("#kodachrome").prop("checked", !0) : "Polaroid" == a.type ? s.find("#polaroid").prop("checked", !0) : "Technicolor" == a.type ? s.find("#technicolor").prop("checked", !0) : "Invert" == a.type ? s.find("#invert").prop("checked", !0) : "Convolute" == a.type ? "[0,-1,0,-1,5,-1,0,-1,0]" == a.matrix ? s.find("#sharpen").prop("checked", !0) : "[1,1,1,1,0.7,-1,-1,-1,-1]" == a.matrix ? s.find("#emboss").prop("checked", !0) : "[-1,0,1,-2,0,2,-1,0,1]" == a.matrix ? s.find("#sobelX").prop("checked", !0) : "[-1,-2,-1,0,0,0,1,2,1]" == a.matrix && s.find("#sobelY").prop("checked", !0) : "Gamma" == a.type ? (s.find("#palleon-gamma").prop("checked", !0), s.find("#gamma-red").val(a.gamma[0]), s.find("#gamma-red").parent().parent().find(".slider-label span").html(a.gamma[0]), s.find("#gamma-green").val(a.gamma[1]), s.find("#gamma-green").parent().parent().find(".slider-label span").html(a.gamma[1]), s.find("#gamma-blue").val(a.gamma[2]), s.find("#gamma-blue").parent().parent().find(".slider-label span").html(a.gamma[2])) : "BlendColor" == a.type ? (s.find("#palleon-blend-color").prop("checked", !0), s.find("#blend-color-mode").val(a.mode), s.find("#blend-color-color").val(a.color), s.find("#blend-color-alpha").val(a.alpha), s.find("#blend-color-alpha").parent().parent().find(".slider-label span").html(a.alpha)) : "Composed" == a.type ? (s.find("#palleon-duotone-color").prop("checked", !0), s.find("#duotone-light-color").val(a.subFilters[1].color), s.find("#duotone-dark-color").val(a.subFilters[2].color)) : "Blur" == a.type ? (s.find("#palleon-blur").prop("checked", !0), s.find("#blur").val(a.blur), s.find("#blur").parent().parent().find(".slider-label span").html(a.blur)) : "Noise" == a.type ? (s.find("#palleon-noise").prop("checked", !0), s.find("#noise").val(a.noise), s.find("#noise").parent().parent().find(".slider-label span").html(a.noise)) : "Pixelate" == a.type && (s.find("#palleon-pixelate").prop("checked", !0), s.find("#pixelate").val(a.blocksize), s.find("#pixelate").parent().parent().find(".slider-label span").html(a.blocksize))
                }), s.find("#palleon-brightness").trigger("change"), s.find("#palleon-contrast").trigger("change"), s.find("#palleon-saturation").trigger("change"), s.find("#palleon-hue").trigger("change"), s.find("#palleon-gamma").trigger("change"), s.find("#palleon-blend-color").trigger("change"), s.find("#palleon-blur").trigger("change"), s.find("#palleon-noise").trigger("change"), s.find("#palleon-pixelate").trigger("change")), a.overlayImage ? (s.find("#palleon-overlay-wrap").show(), s.find("#palleon-overlay-preview").attr("src", a.overlayImage.src)) : (s.find("#palleon-overlay-wrap").hide(), s.find("#palleon-overlay-preview").attr("src", ""))
            }, 100)
        }

        function re(a) {
            0 !== a.length && e.each(a, function(e, a) {
                var t = a.fontFamily.replace("-palleon", "");
                a.fontFamily = c.fontFamily;
                var n = "yes";
                if ("" == t || R.includes(t)) n = "no";
                else
                    for (var l = 0; l < Y.length; l++)
                        if (Y[l][1] == t) {
                            n = "no";
                            break
                        } if ("yes" == n) {
                    "undefined" == typeof palleonCustomFonts ? WebFont.load({
                        google: {
                            families: [t + ":regular,bold", t + ":italic,regular,bold"]
                        }
                    }) : palleonCustomFonts.fonts.includes(t) || WebFont.load({
                        google: {
                            families: [t + ":regular,bold", t + ":italic,regular,bold"]
                        }
                    });
                    var i = new FontFaceObserver(t, {
                            weight: "normal",
                            style: "normal"
                        }),
                        o = new FontFaceObserver(t, {
                            weight: "bold",
                            style: "normal"
                        }),
                        r = new FontFaceObserver(t, {
                            weight: "normal",
                            style: "italic"
                        }),
                        s = new FontFaceObserver(t, {
                            weight: "bold",
                            style: "italic"
                        });
                    Promise.all([i.load(null, 5e3), o.load(null, 5e3), r.load(null, 5e3), s.load(null, 5e3)]).then(function() {
                        R.push(t), a.set("fontFamily", t), a.set("fontSize", a.realFontSize), j.requestRenderAll()
                    }).catch(function(e) {
                        a.set("fontFamily", t), a.set("fontSize", a.realFontSize), j.requestRenderAll(), console.log(e)
                    })
                } else a.set("fontFamily", t), a.set("fontSize", a.realFontSize), j.requestRenderAll()
            })
        }

        function se() {
            if ("frontend" == palleonParams.watermark || "both" == palleonParams.watermark) {
                if ("frontend" == palleonParams.watermark && "backend" == palleonParams.version) return;
                var e = c.watermarkLocation,
                    a = b * c.watermarkFontSize / 1400,
                    t = new fabric.Textbox(" " + palleonParams.watermarkText + " ", {
                        objectType: "watermark",
                        gradientFill: "none",
                        fontSize: a,
                        fontFamily: c.watermarkFontFamily,
                        fontWeight: c.watermarkFontWeight,
                        fontStyle: c.watermarkFontStyle,
                        lineHeight: 1,
                        fill: c.watermarkFontColor,
                        textBackgroundColor: c.watermarkStrokeColor,
                        width: Re()[0],
                        left: 0
                    });
                j.add(t), "bottom-right" == e ? (t.textAlign = "right", t.top = Re()[1] - t.height) : "bottom-left" == e ? (t.textAlign = "left", t.top = Re()[1] - t.height) : "top-right" == e ? (t.textAlign = "right", t.top = 0) : "top-left" == e && (t.textAlign = "left", t.top = 0), t.moveTo(999)
            }
        }

        function de() {
            if ("frontend" == palleonParams.watermark || "both" == palleonParams.watermark) {
                if ("frontend" == palleonParams.watermark && "backend" == palleonParams.version) return;
                (ne = j.getObjects()).filter(e => "watermark" === e.objectType).forEach(e => j.remove(e))
            }
        }
        s.on("click", "#palleon-modal-onstart", function() {
            s.find(".palleon-modal").hide(), s.find("#modal-add-new").show()
        }), s.find(".palleon-modal-open").on("click", function(a) {
            a.preventDefault();
            var t = e(this).data("target");
            s.find(".palleon-modal").hide(), s.find(t).show()
        }), s.find(".palleon-modal-close").on("click", function(a) {
            a.preventDefault();
            var t = e(this).data("target");
            s.find(t).hide()
        }), s.find("#palleon-image-upload").on("change", function() {
            if ("" != e(this).val()) {
                s.find(".palleon-modal").hide(), s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible");
                var a = new FileReader;
                a.onload = function(e) {
                    s.find("#palleon-canvas-img").attr("src", a.result), Q("image")
                }, a.readAsDataURL(this.files[0]), $(this.files[0].name.replace(/\.[^/.]+$/, ""), this.files[0].name.match(/\.[0-9a-z]+$/i)[0].replace(/\./g, ""))
            }
        }), s.find("#palleon-drag-drop-upload").on("dragover", function(a) {
            a.preventDefault(), a.stopPropagation(), e(this).addClass("hovered")
        }), s.find("#palleon-drag-drop-upload").on("dragleave", function(a) {
            a.preventDefault(), a.stopPropagation(), e(this).removeClass("hovered")
        }), s.find("#palleon-drag-drop-upload").on("click", function(e) {
            s.find("#palleon-image-upload").trigger("click")
        }), s.find("#palleon-drag-drop-upload").on("drop", function(a) {
            a.preventDefault(), a.stopPropagation(), s.find("#palleon-drag-drop-upload").removeClass("hovered");
            var t = a.originalEvent.dataTransfer.files,
                n = a.originalEvent.dataTransfer.getData("text/html"),
                l = t[0];
            if (l) {
                var i = l.name.replace(/\.[^/.]+$/, ""),
                    o = l.name.split(".").pop();
                if (!o) return void toastr.warning(palleonParams.wrongFormat, palleonParams.warning);
                $(i, o);
                var r = new FileReader;
                if ("jpg" != o && "jpeg" != o && "png" != o && "webp" != o) return s.find("#palleon-drag-drop-upload").removeClass("hovered"), void toastr.warning(palleonParams.wrongFormat, palleonParams.warning);
                r.onload = function(e) {
                    s.find("#palleon-canvas-img").attr("src", r.result), Q("image")
                }, r.readAsDataURL(l)
            } else if (n) {
                var d = e(n).attr("src");
                if (!d) return void toastr.warning(palleonParams.wrongFormat, palleonParams.warning);
                var c = d.split(".").pop();
                e(document).trigger("loadImgURL", [d, c])
            }
        }), s.find("#palleon-canvas-create").on("click", function() {
            $((new Date).getTime(), ""), Q("canvas")
        }), s.find("#palleon-template-search").on("click", function() {
            e(this);
            var a = s.find("#palleon-template-search-keyword").val(),
                t = s.find("#palleon-templates-menu").val(),
                n = {
                    action: "templateSearch",
                    nonce: palleonParams.nonce,
                    keyword: a,
                    category: t
                };
            var selectedCanvas = s.find("#palleon-canvas-selected").val();
            if (selectedCanvas) {
                n.dimensions = selectedCanvas;
            }
            e.ajax({
                url: palleonParams.ajaxurl,
                data: n,
                type: "POST",
                success: function(e) {
                    e && (s.find("#palleon-templates-grid-pagination").remove(), s.find("#palleon-templates-grid").html(e), z.update(), D(s.find("#palleon-templates-grid")))
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-templates-menu").on("change", function() {
            s.find("#palleon-template-search").trigger("click")
        }), s.find(".template-grid").on("click", ".template-favorite button.star", function() {
            var a = e(this),
                t = a.data("templateid"),
                n = "add";
            a.hasClass("favorited") ? (s.find('*[data-templateid="' + t + '"]').removeClass("favorited"), n = "remove") : s.find('*[data-templateid="' + t + '"]').addClass("favorited");
            var l = {
                action: "favTemplate",
                nonce: palleonParams.nonce,
                templateid: t,
                mode: n
            };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: l,
                type: "POST",
                success: function(e) {
                    "add" == n ? (toastr.success(palleonParams.favorited, palleonParams.success), s.find('*[data-templateid="' + t + '"]').html('<span class="material-icons">star</span>')) : (toastr.success(palleonParams.unfavorited, palleonParams.success), s.find('*[data-templateid="' + t + '"]').html('<span class="material-icons">star_border</span>')), e && (s.find("#palleon-templates-favorites-grid-pagination").remove(), s.find("#palleon-templates-favorites-grid").html(e), z.update(), D(s.find("#palleon-templates-favorites-grid")))
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-json-download").on("click", function() {
            var e = s.find("#palleon-json-download-name").val(),
                a = j.toJSON(W);
            G(a.backgroundImage.src, function(t) {
                a.backgroundImage.src = t;
                var n = JSON.stringify(a),
                    l = document.createElement("a"),
                    i = new Blob([n], {
                        type: "text/plain"
                    });
                l.href = URL.createObjectURL(i), l.download = e + ".json", l.click(), s.find(".palleon-modal").hide()
            })
        }), e(document).on("loadTemplate", function(a, t, n, l) {
            if (j.getObjects().filter(e => "BG" != e.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers li").remove(), ue(), t) {
                var i = JSON.parse(t);
                G(i.backgroundImage.src, function(e) {
                    i.backgroundImage.src = e, oe(i), "" != l && (j.backgroundColor = l), setTimeout(function() {
                        s.find("#palleon-canvas-loader").hide()
                    }, 500)
                })
            } else e.getJSON(n, function(e) {
                oe(e), "" != l && (j.backgroundColor = l)
            }).fail(function(e, a, t) {
                toastr.error("Request Failed: " + t, palleonParams.error)
            }).always(function() {
                setTimeout(function() {
                    s.find("#palleon-canvas-loader").hide()
                }, 500)
            })
        }), e(document).on("loadTemplateFonts", function(e, a) {
            0 !== a.length && re(a)
        }), s.find("#palleon-json-upload").on("change", function(e) {
            s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible"), s.find("#palleon-canvas-loader").css("display", "flex");
            var a = new FileReader;
            a.onload = function(e) {
                oe(JSON.parse(a.result)), s.find("#palleon-canvas-loader").hide(), setTimeout(function() {
                    L(), ge('<span class="material-icons">flag</span>' + palleonParams.started)
                }, 500)
            }, a.readAsText(e.target.files[0]), s.find(".palleon-modal").hide()
        }), s.find("#palleon-templates-grid").on("mouseenter", ".palleon-select-template", function() {
            var a = e(this).find("img.lazy").data("title"),
                t = e(this).find("img.lazy").data("preview");
            e(this).append('<div id="palleon-template-preview"><div class="palleon-img-wrap"><div class="palleon-img-loader"></div><img class="lazy" data-src="' + t + '" /></div><div id="palleon-template-preview-title">' + a + "</div></div>"), z.update()
        }).on("mousemove", ".palleon-select-template", function(e) {
            jQuery("#palleon-template-preview").position({
                my: "left+20 top",
                of: e,
                collision: "fit flip"
            })
        }).on("mouseleave", ".palleon-select-template", function() {
            jQuery("#palleon-template-preview").remove()
        }), s.find(".template-selection").on("click", ".palleon-select-template", function() {
            var a = e(this).attr("data-version");
            if ("frontend" == palleonParams.version && "pro" == a) toastr.warning(palleonParams.proInfo, palleonParams.proInfoTitle);
            else if ("backend" == palleonParams.version && "pro" == a && "yes" != palleonParams.proCheck) toastr.warning(palleonParams.upgradeInfo, palleonParams.upgradeInfoTitle);
            else {
                s.find("#palleon-canvas-wrap, .palleon-content-bar").css("visibility", "visible"), s.find(".palleon-modal").hide(), s.find("#palleon-canvas-loader").css("display", "flex"), j.getObjects().filter(e => "BG" != e.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers li").remove(), ue(), e.getJSON(e(this).data("json"), function(e) {
                    oe(e), setTimeout(function() {
                        L(), ge('<span class="material-icons">flag</span>' + palleonParams.started)
                    }, 500)
                }).fail(function(e, a, t) {
                    toastr.error("Request Failed: " + t, palleonParams.error)
                }).always(function() {
                    s.find("#palleon-canvas-loader").hide()
                })
            }
        }), s.find(".template-selection").on("click", ".palleon-share-template", function() {
            var a = e(this).data("json");
            s.find("#modal-share-title").html(palleonParams.shareTemplate), ce(a)
        }), s.find("#palleon-my-templates-search").on("click", function() {
            var a = e(this).parent().find("input");
            if (s.find("#palleon-my-templates-noimg").addClass("d-none"), "" != a.val())
                if (e(this).hasClass("cancel")) e(this).removeClass("cancel"), e(this).find(".material-icons").html("search"), e(this).removeClass("danger"), e(this).addClass("primary"), a.val(""), s.find("#palleon-my-templates li").show(), s.find("#palleon-my-templates-pagination").length && (s.find("#palleon-my-templates-pagination").pagination("redraw"), s.find("#palleon-my-templates-pagination").pagination("selectPage", 1)), a.prop("disabled", !1);
                else {
                    e(this).addClass("cancel"), e(this).find(".material-icons").html("close"), e(this).removeClass("primary"), e(this).addClass("danger");
                    var t = a.val().toLowerCase().replace(/\s/g, " ");
                    "" == t || t.length < 1 ? (s.find("#palleon-my-templates li").show(), s.find("#palleon-my-templates-pagination").length && (s.find("#palleon-my-templates-pagination").pagination("redraw"), s.find("#palleon-my-templates-pagination").pagination("selectPage", 1))) : (s.find("#palleon-my-templates-pagination").length && s.find("#palleon-my-templates-pagination").pagination("destroy"), s.find("#palleon-my-templates li").hide().filter('[data-keyword*="' + t + '"]').show(), 0 === s.find("#palleon-my-templates li:visible").length && s.find("#palleon-my-templates-noimg").removeClass("d-none")), a.prop("disabled", !0)
                }
        }), s.find("#palleon-download").on("click", function() {
            var a = s.find("#palleon-download-name").val(),
                t = parseFloat(s.find("#palleon-download-quality").val()),
                n = s.find("#palleon-download-format").val(),
                l = document.createElement("a"),
                i = "";
            se(), j.setZoom(1), s.find("#palleon-img-zoom").val(100);
            var o = v,
                r = b;
            0 != y && 180 != y && -180 != y || (o = b, r = v), j.setWidth(o), j.setHeight(r);
            var d = "";
            if ("svg" == n) {
                var c = j.toSVG({
                        suppressPreamble: !1,
                        width: b,
                        height: v
                    }),
                    p = j.getObjects().filter(e => "textbox" == e.objectType),
                    f = '<defs><style type="text/css"><![CDATA[',
                    g = [];
                e.each(p, function(e, a) {
                    for (var t = a.fontFamily, n = "yes", l = 0; l < Y.length; l++)
                        if (Y[l][1] == t) {
                            n = "no";
                            break
                        }
                    "yes" == n && ("undefined" == typeof palleonCustomFonts ? g.includes(t) || g.push(t) : palleonCustomFonts.fonts.includes(t) || g.includes(t) || g.push(t))
                }), g.length > 0 ? e.each(g, function(t, o) {
                    var r = t == g.length - 1,
                        s = o.replace(/ /g, "+");
                    e.ajax({
                        url: "https://fonts.googleapis.com/css?family=" + s + ":italic,regular,bold",
                        type: "GET",
                        dataType: "text",
                        crossDomain: !0,
                        success: function(e) {
                            f += e, setTimeout(function() {
                                r && (c = c.replace("<defs>", f + "]]></style>"), d = new Blob([c], {
                                    type: "image/svg+xml;charset=utf-8"
                                }), i = URL.createObjectURL(d), l.download = a + "." + n, l.href = i, l.click())
                            }, 500)
                        },
                        error: function(e, a, t) {
                            e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                        }
                    })
                }) : (d = new Blob([c], {
                    type: "image/svg+xml;charset=utf-8"
                }), i = URL.createObjectURL(d), l.download = a + "." + n, l.href = i, l.click())
            } else if ("tiff" == n) {
                var m = j.toDataURL({
                        format: "png",
                        enableRetinaScaling: !1
                    }),
                    h = document.createElement("canvas");
                h.width = parseInt(s.find("#palleon-resize-width").val()), h.height = parseInt(s.find("#palleon-resize-height").val());
                var u = h.getContext("2d"),
                    w = new Image;
                w.src = m, w.onload = function() {
                    u.drawImage(this, 0, 0, h.width, h.height), CanvasToTIFF.toBlob(h, function(e) {
                        i = URL.createObjectURL(e), l.download = a + "." + n, l.href = i, l.click(), h.remove(), w.remove()
                    }, {
                        dpi: parseInt(s.find("#palleon-download-img-dpi").val())
                    })
                }
            } else {
                m = j.toDataURL({
                    format: n,
                    quality: t,
                    enableRetinaScaling: !1
                });
                "webp" != n && (m = changeDpiDataUrl(m, s.find("#palleon-download-img-dpi").val())), d = H(m), i = URL.createObjectURL(d), l.download = a + "." + n, l.href = i, l.click()
            }
            de(), ye(), j.requestRenderAll(), s.find(".palleon-modal").hide()
        }), s.find("#palleon-download-format").on("change", function() {
            "png" == e(this).val() || "svg" == e(this).val() ? s.find("#palleon-download-quality").prop("disabled", !0) : s.find("#palleon-download-quality").prop("disabled", !1)
        }), s.find(".palleon-save-img-format").on("change", function() {
            "png" == e(this).val() || "svg" == e(this).val() ? s.find("#palleon-save-img-quality").prop("disabled", !0) : s.find("#palleon-save-img-quality").prop("disabled", !1)
        }), s.find("#palleon-save-img").on("click", function() {
            var a = e(this);
            a.prop("disabled", !0);
            var t = (new Date).getTime(),
                n = s.find("#palleon-save-img-name").val(),
                l = parseFloat(s.find("#palleon-save-img-quality").val()),
                i = s.find(".palleon-save-img-format").val(),
                o = s.find("#palleon-canvas-img").data("id");
            se(), j.setZoom(1), s.find("#palleon-img-zoom").val(100);
            var r = v,
                d = b;
            0 != y && 180 != y && -180 != y || (r = b, d = v), j.setWidth(r), j.setHeight(d);
            var c = "",
                p = "",
                f = new FormData;
            if ("svg" == i) {
                p = j.toSVG({
                    suppressPreamble: !1,
                    width: b,
                    height: v
                });
                var g = j.getObjects().filter(e => "textbox" == e.objectType),
                    m = '<defs><style type="text/css"><![CDATA[',
                    h = [];
                e.each(g, function(e, a) {
                    for (var t = a.fontFamily, n = "yes", l = 0; l < Y.length; l++)
                        if (Y[l][1] == t) {
                            n = "no";
                            break
                        }
                    "yes" == n && ("undefined" == typeof palleonCustomFonts ? h.includes(t) || h.push(t) : palleonCustomFonts.fonts.includes(t) || h.includes(t) || h.push(t))
                }), h.length > 0 ? e.each(h, function(l, r) {
                    var d = l == h.length - 1,
                        g = r.replace(/ /g, "+");
                    e.ajax({
                        url: "https://fonts.googleapis.com/css?family=" + g + ":italic,regular,bold",
                        type: "GET",
                        dataType: "text",
                        crossDomain: !0,
                        success: function(l) {
                            m += l, setTimeout(function() {
                                d && (p = p.replace("<defs>", m + "]]></style>"), c = new Blob([p], {
                                    type: "image/svg+xml;charset=utf-8"
                                }), f.append("id", o), f.append("mode", "image"), f.append("name", n), f.append("filename", t), f.append("format", i), f.append("type", c.type), f.append("url", p), f.append("action", "saveImage"), f.append("nonce", palleonParams.nonce), e.ajax({
                                    url: palleonParams.ajaxurl,
                                    type: "POST",
                                    contentType: !1,
                                    processData: !1,
                                    cache: !1,
                                    data: f,
                                    success: function(e) {
                                        "404" != e ? (toastr.success(palleonParams.imgsaved, palleonParams.success), s.find(".palleon-modal").hide(), s.find("#modal-share-title").html(palleonParams.shareImage), ce(e)) : toastr.error(palleonParams.fileLimit, palleonParams.error)
                                    },
                                    error: function(e, a, t) {
                                        e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                                    }
                                }).done(function() {
                                    a.prop("disabled", !1)
                                }))
                            }, 500)
                        },
                        error: function(e, t, n) {
                            e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error), a.prop("disabled", !1)
                        }
                    })
                }) : (c = new Blob([p], {
                    type: "image/svg+xml;charset=utf-8"
                }), f.append("id", o), f.append("mode", "image"), f.append("name", n), f.append("filename", t), f.append("format", i), f.append("type", c.type), f.append("url", p), f.append("action", "saveImage"), f.append("nonce", palleonParams.nonce), e.ajax({
                    url: palleonParams.ajaxurl,
                    type: "POST",
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    data: f,
                    success: function(e) {
                        "404" != e ? (toastr.success(palleonParams.imgsaved, palleonParams.success), s.find(".palleon-modal").hide(), s.find("#modal-share-title").html(palleonParams.shareImage), ce(e)) : toastr.error(palleonParams.fileLimit, palleonParams.error)
                    },
                    error: function(e, a, t) {
                        e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                    }
                }).done(function() {
                    a.prop("disabled", !1)
                }))
            } else if ("tiff" == i) {
                p = j.toDataURL({
                    format: "png",
                    enableRetinaScaling: !1
                });
                var u = document.createElement("canvas");
                u.width = parseInt(s.find("#palleon-resize-width").val()), u.height = parseInt(s.find("#palleon-resize-height").val());
                var w = u.getContext("2d"),
                    k = new Image;
                k.src = p, k.onload = function() {
                    w.drawImage(this, 0, 0, u.width, u.height), CanvasToTIFF.toDataURL(u, function(l) {
                        f.append("id", o), f.append("mode", "image"), f.append("name", n), f.append("filename", t), f.append("format", i), f.append("type", "image/tiff"), f.append("url", l), f.append("action", "saveImage"), f.append("nonce", palleonParams.nonce), e.ajax({
                            url: palleonParams.ajaxurl,
                            type: "POST",
                            contentType: !1,
                            processData: !1,
                            cache: !1,
                            data: f,
                            success: function(e) {
                                "404" != e ? (toastr.success(palleonParams.imgsaved, palleonParams.success), s.find(".palleon-modal").hide(), s.find("#modal-share-title").html(palleonParams.shareImage), ce(e)) : toastr.error(palleonParams.fileLimit, palleonParams.error)
                            },
                            error: function(e, t, n) {
                                e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error), a.prop("disabled", !1)
                            }
                        }).done(function() {
                            a.prop("disabled", !1)
                        }), u.remove(), k.remove()
                    }, {
                        dpi: parseInt(s.find("#palleon-save-img-dpi").val())
                    })
                }
            } else p = j.toDataURL({
                format: i,
                quality: l,
                enableRetinaScaling: !1
            }), "webp" != i && (p = changeDpiDataUrl(p, s.find("#palleon-save-img-dpi").val())), c = H(p), f.append("id", o), f.append("mode", "image"), f.append("name", n), f.append("filename", t), f.append("format", i), f.append("type", c.type), f.append("url", p), f.append("action", "saveImage"), f.append("nonce", palleonParams.nonce), e.ajax({
                url: palleonParams.ajaxurl,
                type: "POST",
                contentType: !1,
                processData: !1,
                cache: !1,
                data: f,
                success: function(e) {
                    "404" != e ? (toastr.success(palleonParams.imgsaved, palleonParams.success), s.find(".palleon-modal").hide(), s.find("#modal-share-title").html(palleonParams.shareImage), ce(e)) : toastr.error(palleonParams.fileLimit, palleonParams.error)
                },
                error: function(e, t, n) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error), a.prop("disabled", !1)
                }
            }).done(function() {
                a.prop("disabled", !1)
            });
            de(), ye(), j.requestRenderAll()
        });

        function ce(e) {
            if ("" != e && "enable" == palleonParams.share) {
                var a = s.find(".rrssb-facebook > a"),
                    t = s.find(".rrssb-twitter > a"),
                    n = s.find(".rrssb-linkedin > a"),
                    l = s.find(".rrssb-reddit > a"),
                    i = s.find(".rrssb-pinterest > a"),
                    o = s.find(".rrssb-whatsapp > a");
                s.find("#palleon-share-url").val(e), a.attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + e), t.attr("href", "https://twitter.com/intent/tweet?url=" + e), n.attr("href", "http://www.linkedin.com/sharing/share-offsite/?url=" + e), l.attr("href", "http://www.reddit.com/submit?url=" + e), i.attr("href", "http://pinterest.com/pin/create/button/?media=" + e), o.attr("href", "whatsapp://send?text=" + e), s.find(".palleon-modal").hide(), s.find("#modal-share").show()
            }
        }

        function pe(e) {
            if (!e._objects) return !0;
            if ("object" != typeof e._objects[0].get("fill")) {
                var a = (e._objects[0].get("fill") || "").toLowerCase();
                return e._objects.every(function(e) {
                    return (e.get("fill") || "").toLowerCase() === a
                })
            }
        }

        function fe(e) {
            var a = palleonParams.object,
                t = "category";
            return null == e ? (a = palleonParams.object, t = "category") : "textbox" == e ? (a = palleonParams.text, t = "title") : "drawing" == e ? (a = palleonParams.freeDrawing, t = "brush") : "frame" == e ? (a = palleonParams.frame, t = "wallpaper") : "image" == e ? (a = palleonParams.image, t = "image") : "circle" == e ? a = palleonParams.circle : "square" == e ? a = palleonParams.square : "rectangle" == e ? a = palleonParams.rectangle : "triangle" == e ? a = palleonParams.triangle : "ellipse" == e ? a = palleonParams.ellipse : "trapezoid" == e ? a = palleonParams.trapezoid : "pentagon" == e ? a = palleonParams.pentagon : "octagon" == e ? a = palleonParams.octagon : "emerald" == e ? a = palleonParams.emerald : "diamond" == e ? a = palleonParams.diamond : "parallelogram" == e ? a = palleonParams.parallelogram : "star" == e ? a = palleonParams.star : "element" == e ? (a = palleonParams.element, t = "star") : "BG" == e ? (a = palleonParams.bg, t = "image") : "customShape" == e ? a = palleonParams.customShape : "customSVG" == e ? a = palleonParams.customSvg : "app" == e && (a = palleonParams.app, t = "apps"), '<span class="material-icons">' + t + "</span>" + a
        }

        function ge(e) {
            var a = s.find("#palleon-history-list"),
                t = new Date,
                n = String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0") + ":" + String(t.getSeconds()).padStart(2, "0"),
                l = j.toJSON(W);
            s.find("#palleon-history").prop("disabled", !1), a.find("li").removeClass("active"), a.prepend('<li class="active"><div class="info">' + e + '<span class="time">' + n + '</span></div><div><button type="button" class="palleon-btn primary"><span class="material-icons">restore</span>Restore</button><button type="button" class="palleon-btn danger"><span class="material-icons">clear</span>Delete</button><script type="text/json">' + JSON.stringify(l) + "<\/script></div></li>"), a.find("li").length > a.data("max") && a.find("li").last().remove(), s.find("#palleon-history-count").html(a.find("li").length);
            var i = a.find("li.active").next("li"),
                o = a.find("li.active").prev("li");
            i.length ? s.find("#palleon-undo").prop("disabled", !1) : s.find("#palleon-undo").prop("disabled", !0), o.length ? s.find("#palleon-redo").prop("disabled", !1) : s.find("#palleon-redo").prop("disabled", !0)
        }
        s.find(".rrssb-buttons .popup").on("click", function(a) {
            var t, n, l, i, o, r, s, d, c, p = e(this);
            t = p.attr("href"), n = p.data("title"), l = 580, i = 470, o = void 0 !== window.screenLeft ? window.screenLeft : screen.left, r = void 0 !== window.screenTop ? window.screenTop : screen.top, s = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width) / 2 - l / 2 + o, d = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height) / 3 - i / 3 + r, (c = window.open(t, n, "scrollbars=yes, width=" + l + ", height=" + i + ", top=" + d + ", left=" + s)) && c.focus && c.focus(), a.preventDefault()
        }), s.find("#modal-media-library").on("click", ".palleon-library-share", function() {
            var a = e(this).data("url");
            s.find("#modal-share-title").html(palleonParams.shareImage), ce(a)
        }), s.find("#modal-svg-library").on("click", ".palleon-library-share", function() {
            var a = e(this).data("url");
            s.find("#modal-share-title").html(palleonParams.shareImage), ce(a)
        }), s.find("#modal-share-copy").on("click", function() {
            var a = e(this),
                t = document.getElementById("palleon-share-url");
            t.select(), t.setSelectionRange(0, 99999), navigator.clipboard.writeText(t.value), a.html(palleonParams.copied), setTimeout(function() {
                a.html(palleonParams.copyURL)
            }, 2e3)
        }), s.find("#palleon-share-url").focus(function() {
            var e = document.getElementById("palleon-share-url");
            e.select(), e.setSelectionRange(0, 99999)
        }), s.find("#palleon-json-save").on("click", function() {
            var e = j.toJSON(W);
            G(e.backgroundImage.src, function(a) {
                e.backgroundImage.src = a;
                var t = JSON.stringify(e),
                    n = Math.random().toString(36).substr(2, 9),
                    l = s.find("#palleon-save-img-name").val();
                try {
                    p.collection("assets").add({
                        key: n,
                        src: t,
                        name: l,
                        type: "json"
                    }).then(e => {
                        toastr.success(palleonParams.tempsaved, palleonParams.saved), E()
                    })
                } catch (e) {
                    toastr.error(e.message, palleonParams.error)
                }
                s.find(".palleon-modal").hide()
            })
        }), s.find("#palleon-petemplate-save").on("click", function() {
            var a = e(this);
            a.prop("disabled", !0);
            var t = (new Date).getTime(),
                n = s.find("#palleon-petemplate-save-name").val(),
                l = s.find("#palleon-petemplate-save-tag").val(),
                i = s.find("#palleon-petemplate-save-version").find(":selected").val();
            l = JSON.stringify(l);
            var o = j.toJSON(W);
            G(o.backgroundImage.src, function(r) {
                o.backgroundImage.src = r, o = JSON.stringify(o);
                var d = j.toDataURL({
                        format: "png",
                        quality: "1.0",
                        enableRetinaScaling: !1
                    }),
                    c = H(d),
                    p = new FormData;
                p.append("name", n), p.append("tag", l), p.append("version", i), p.append("filename", t), p.append("json", o), p.append("thumb", d), p.append("type", c.type), p.append("action", "savePEtemplate"), p.append("nonce", palleonParams.nonce), e.ajax({
                    url: palleonParams.ajaxurl,
                    type: "POST",
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    data: p,
                    success: function(e) {
                        toastr.success(palleonParams.tempsaved, palleonParams.success), s.find(".palleon-modal").hide(), s.find("#modal-share-title").html(palleonParams.shareTemplate), ce(e)
                    },
                    error: function(e, a, t) {
                        e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                    }
                }).done(function() {
                    a.prop("disabled", !1)
                })
            })
        }), s.find("#palleon-agtemplate-save").on("click", function() {
            var a = e(this);
            a.prop("disabled", !0);
            var t = (new Date).getTime(),
                n = s.find("#palleon-agtemplate-save-name").val(),
                l = s.find("#palleon-agtemplate-save-tag").val();
            l = JSON.stringify(l);
            var i = j.toJSON(W);
            G(i.backgroundImage.src, function(o) {
                i.backgroundImage.src = o, i = JSON.stringify(i);
                var r = j.toDataURL({
                        format: "png",
                        quality: "1.0",
                        enableRetinaScaling: !1
                    }),
                    d = H(r),
                    c = new FormData;
                c.append("name", n), c.append("tag", l), c.append("filename", t), c.append("json", i), c.append("thumb", r), c.append("type", d.type), c.append("action", "saveAGtemplate"), c.append("nonce", palleonParams.nonce), e.ajax({
                    url: palleonParams.ajaxurl,
                    type: "POST",
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    data: c,
                    success: function() {
                        toastr.success(palleonParams.tempsaved, palleonParams.success), s.find(".palleon-modal").hide()
                    },
                    error: function(e, a, t) {
                        e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                    }
                }).done(function() {
                    a.prop("disabled", !1)
                })
            })
        }), s.find("#palleon-canvas-size-select").on("change", function() {
            "custom" == e(this).val() ? (s.find("#palleon-canvas-width").prop("disabled", !1), s.find("#palleon-canvas-height").prop("disabled", !1)) : (s.find("#palleon-canvas-width").prop("disabled", !0), s.find("#palleon-canvas-height").prop("disabled", !0)), s.find("#palleon-canvas-width").val(e(this).find(":selected").data("width")), s.find("#palleon-canvas-height").val(e(this).find(":selected").data("height"))
        }), s.find("#palleon-canvas-color").on("change", function() {
            var a = e(this).val();
            s.find("#custom-image-background").spectrum("set", a), "" == a ? (j.backgroundColor = "transparent", j.requestRenderAll()) : (j.backgroundColor = a, j.requestRenderAll())
        }), s.find("#palleon-media-library").on("click", function() {
            F = "add-to-canvas"
        }), s.find("#palleon-img-media-library").on("click", function() {
            F = "add-as-object"
        }), s.find("#palleon-img-replace-media-library").on("click", function() {
            F = "replace-image"
        }), s.find("#palleon-pdf-media-library").on("click", function() {
            F = "pdf-image"
        }), s.find("#palleon-overlay-img-media-library").on("click", function() {
            F = "overlay-image"
        }), s.find("#agama-bg-media-library").on("click", function() {
            F = "agama-bg-image"
        }), s.find("#modal-media-library").on("click", ".media-library-grid>.palleon-masonry-item>.palleon-masonry-item-inner", function() {
            s.find("#palleon-canvas-loader").css("display", "flex"), s.find("#palleon-canvas-wrap").css("visibility", "visible");
            var a = e(this).find("img").attr("title");
            "" == a && (a = palleonParams.notitle);
            var t = e(this).find("img").data("full"),
                n = new Image;
            if ("add-to-canvas" == F) {
                var l = t.substring(0, t.indexOf("?"));
                $(e(this).find("img").data("filename"), "" != l ? l.match(/\.[0-9a-z]+$/i)[0].replace(/\./g, "") : t.match(/\.[0-9a-z]+$/i)[0].replace(/\./g, "")), G(t, function(e) {
                    n.src = e, n.onload = function() {
                        s.find("#palleon-canvas-img").attr("src", e), Q("image")
                    }
                })
            } else if ("add-as-object" == F) {
                var i = Re()[1] / 2,
                    o = Re()[0] / 2;
                (r = j.getObjects().filter(e => "printarea" == e.objectType)[0]) && (i = r.top, o = r.left), G(t, function(e) {
                    n.src = e, n.onload = function() {
                        var e = new fabric.Image(n, {
                            objectType: "image",
                            objectCaching: !0,
                            roundedCorders: 0,
                            stroke: "#fff",
                            strokeWidth: 0,
                            top: i,
                            left: o,
                            originX: "center",
                            originY: "center"
                        });
                        e.set({
                            ogWidth: e.get("width"),
                            ogHeight: e.get("height")
                        }), j.add(e), r ? (e.scaleToWidth(.8 * r.width * j.getZoom()), e.isContainedWithinObject(r) || e.scaleToHeight(.8 * r.height * j.getZoom())) : (e.scaleToWidth(Re()[0] / 4), e.isPartiallyOnScreen() && e.scaleToHeight(Re()[1] / 4)), j.setActiveObject(e), j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                            type: "image",
                            text: palleonParams.added
                        })
                    }
                })
            } else if ("replace-image" == F) G(t, function(e) {
                n.src = e, n.onload = function() {
                    j.getActiveObject().setSrc(e), j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                        type: "image",
                        text: palleonParams.replaced
                    })
                }
            });
            else if ("pdf-image" == F) s.find("#palleon-canvas-loader").hide(), s.find("#palleon-selected-pdf-list").append('<div class="palleon-pdf-item"><div class="palleon-pdf-img-drag"><span class="material-icons">drag_indicator</span></div><img src="' + t + '" /><span>' + a + '</span><div class="palleon-pdf-img-delete"><span class="material-icons">remove</span></div></div>'), s.find("#palleon-selected-pdf-list").sortable("refresh"), s.find("#palleon-selected-pdf-list").is(":empty") ? s.find("#palleon-generate-pdf").prop("disabled", !0) : s.find("#palleon-generate-pdf").prop("disabled", !1);
            else if ("overlay-image" == F) G(t, function(e) {
                n.src = e, n.onload = function() {
                    var e = new fabric.Image(n);
                    e.set({
                        scaleX: Re()[0] / e.width,
                        scaleY: Re()[1] / e.height,
                        objectCaching: !1,
                        originX: "left",
                        originY: "top",
                        selectable: !1,
                        lockMovementX: !0,
                        lockMovementY: !0,
                        lockRotation: !0,
                        erasable: !0
                    }), j.setOverlayImage(e, j.renderAll.bind(j)), s.find("#palleon-overlay-wrap").show(), s.find("#palleon-overlay-preview").attr("src", t), setTimeout(function() {
                        s.find("#palleon-canvas-loader").hide()
                    }, 500)
                }
            });
            else if ("agama-bg-image" == F) {
                var r;
                (r = j.getObjects().filter(e => "printarea" == e.objectType)[0]) && (s.find("#agama-bg-delete").trigger("click"), G(t, function(e) {
                    n.src = e, n.onload = function() {
                        var e = new fabric.Image(n);
                        e.scaleToWidth(r.width / 2);
                        var a = new fabric.StaticCanvas;
                        a.setDimensions({
                            width: e.getScaledWidth(),
                            height: e.getScaledHeight()
                        }), a.add(e), a.renderAll();
                        var t = new fabric.Pattern({
                            source: a.getElement(),
                            repeat: "repeat",
                            offsetX: 0,
                            offsetY: 0,
                            angle: 0
                        });
                        r.clone(function(e) {
                            e.set({
                                id: (new Date).getTime(),
                                objectType: "clipPath",
                                objectCaching: !1,
                                fill: t,
                                selectable: !1,
                                lockMovementX: !0,
                                lockMovementY: !0,
                                lockRotation: !0,
                                erasable: !1,
                                stroke: "transparent",
                                strokeWidth: 0
                            }), j.add(e), j.sendToBack(e), j.sendToBack(r)
                        }), s.find("#agama-bg-width").val(Math.round(parseInt(e.getScaledWidth()))), s.find("#agama-bg-width").attr("min", Math.round(parseInt(e.getScaledWidth()) / 4)), s.find("#agama-bg-width").attr("max", Math.round(4 * parseInt(e.getScaledWidth()))), s.find("#agama-bg-offset-x").val(0), s.find("#agama-bg-offset-x").attr("max", Math.round(4 * parseInt(e.getScaledWidth()))), s.find("#agama-bg-offset-y").val(0), s.find("#agama-bg-offset-y").attr("max", Math.round(4 * parseInt(e.getScaledHeight()))), s.find("#agama-bg-width").trigger("input"), s.find("#agama-bg-offset-x").trigger("input"), s.find("#agama-bg-offset-y").trigger("input"), s.find("#agama-bg-image-settings").show(), s.find("#agama-bg-delete").show(), document.getElementById("agama-bg-width").oninput = function() {
                            e.scaleToWidth(parseInt(this.value, 10)), a.setDimensions({
                                width: e.getScaledWidth(),
                                height: e.getScaledHeight()
                            }), j.requestRenderAll()
                        }, document.getElementById("agama-bg-offset-x").oninput = function() {
                            t.offsetX = parseInt(this.value, 10), j.requestRenderAll()
                        }, document.getElementById("agama-bg-offset-y").oninput = function() {
                            t.offsetY = parseInt(this.value, 10), j.requestRenderAll()
                        }, setTimeout(function() {
                            j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                                type: "image",
                                text: palleonParams.added
                            })
                        }, 500)
                    }
                }))
            }
            s.find("#modal-media-library").hide()
        }), s.find("#palleon-selected-pdf-list").on("click", ".palleon-pdf-img-delete", function() {
            e(this).parent().remove(), s.find("#palleon-selected-pdf-list").sortable("refresh"), s.find("#palleon-selected-pdf-list").is(":empty") ? s.find("#palleon-generate-pdf").prop("disabled", !0) : s.find("#palleon-generate-pdf").prop("disabled", !1)
        }), s.find("#palleon-selected-pdf-list").sortable({
            items: ".palleon-pdf-item",
            placeholder: "pdf-item-placeholder",
            axis: "y"
        }).disableSelection(), s.find("#palleon-generate-pdf").on("click", function() {
            if (!s.find("#palleon-selected-pdf-list").is(":empty")) {
                s.find("#palleon-generate-pdf").prop("disabled", !0);
                var a = s.find("#palleon-pdf-orientation").find(":selected").val(),
                    t = s.find("#palleon-pdf-format").find(":selected").val();
                if ("custom" == t) {
                    var n = s.find("#palleon-pdf-custom-width").val();
                    "" != n && 0 != n && "0" != n || (n = 100);
                    var l = s.find("#palleon-pdf-custom-height").val();
                    "" != l && 0 != l && "0" != l || (l = 100), t = [parseInt(n), parseInt(l)]
                }
                window.jsPDF = window.jspdf.jsPDF;
                var i = new jsPDF({
                        orientation: a,
                        format: t
                    }),
                    o = s.find("#palleon-selected-pdf-list > .palleon-pdf-item"),
                    r = o.length;
                o.each(function(a, t) {
                    const n = e(this).find("img")[0],
                        l = n.src;
                    var o = i.internal.pageSize.getWidth(),
                        s = n.naturalHeight / n.naturalWidth * o;
                    const d = l.split(".").pop().toLowerCase();
                    let c;
                    if ("jpg" === d || "jpeg" === d) c = "JPEG";
                    else if ("webp" === d) c = "WEBP";
                    else {
                        if ("png" !== d) return;
                        c = "PNG"
                    }
                    var p = i.internal.pageSize.getWidth(),
                        f = i.internal.pageSize.getHeight(),
                        g = (f - s) / 2,
                        m = 0;
                    g <= 0 ? (s = f, m = (p - (o = n.naturalWidth / n.naturalHeight * s)) / 2, i.addImage(l, c, m, 0, o, s)) : i.addImage(l, c, 0, g, o, s), a !== r - 1 && i.addPage()
                }), i.save("images.pdf"), s.find("#palleon-generate-pdf").prop("disabled", !1)
            }
        }), s.find("#palleon-pdf-format").on("change", function() {
            "custom" == e(this).val() ? (s.find("#palleon-pdf-custom").removeClass("d-none"), s.find("#palleon-pdf-format-desc").addClass("d-none")) : (s.find("#palleon-pdf-custom").addClass("d-none"), s.find("#palleon-pdf-format-desc").removeClass("d-none"))
        }), s.find("#palleon-library-my-search").on("click", function() {
            var a = e(this).parent().find("input");
            if (s.find("#palleon-library-my-noimg").addClass("d-none"), "" != a.val())
                if (e(this).hasClass("cancel")) e(this).removeClass("cancel"), e(this).find(".material-icons").html("search"), e(this).removeClass("danger"), e(this).addClass("primary"), a.val(""), s.find("#palleon-library-my .palleon-masonry-item").show(), s.find("#palleon-library-my-pagination").length && (s.find("#palleon-library-my-pagination").pagination("redraw"), s.find("#palleon-library-my-pagination").pagination("selectPage", 1)), a.prop("disabled", !1);
                else {
                    e(this).addClass("cancel"), e(this).find(".material-icons").html("close"), e(this).removeClass("primary"), e(this).addClass("danger");
                    var t = a.val().toLowerCase().replace(/\s/g, " ");
                    "" == t || t.length < 1 ? (s.find("#palleon-library-my .palleon-masonry-item").show(), s.find("#palleon-library-my-pagination").length && (s.find("#palleon-library-my-pagination").pagination("redraw"), s.find("#palleon-library-my-pagination").pagination("selectPage", 1))) : (s.find("#palleon-library-my-pagination").length && s.find("#palleon-library-my-pagination").pagination("destroy"), s.find("#palleon-library-my .palleon-masonry-item").hide().filter('[data-keyword*="' + t + '"]').show(), 0 === s.find("#palleon-library-my .palleon-masonry-item:visible").length && s.find("#palleon-library-my-noimg").removeClass("d-none")), a.prop("disabled", !0)
                }
        }), s.find("#palleon-library-all-search").on("click", function() {
            var a = e(this).parent().find("input");
            if (s.find("#palleon-library-all-noimg").addClass("d-none"), "" != a.val())
                if (e(this).hasClass("cancel")) e(this).removeClass("cancel"), e(this).find(".material-icons").html("search"), e(this).removeClass("danger"), e(this).addClass("primary"), a.val(""), s.find("#palleon-library-all .palleon-masonry-item").show(), s.find("#palleon-library-all-pagination").length && (s.find("#palleon-library-all-pagination").pagination("redraw"), s.find("#palleon-library-all-pagination").pagination("selectPage", 1)), a.prop("disabled", !1);
                else {
                    e(this).addClass("cancel"), e(this).find(".material-icons").html("close"), e(this).removeClass("primary"), e(this).addClass("danger");
                    var t = a.val().toLowerCase().replace(/\s/g, " ");
                    "" == t || t.length < 1 ? (s.find("#palleon-library-all .palleon-masonry-item").show(), s.find("#palleon-library-all-pagination").length && (s.find("#palleon-library-all-pagination").pagination("redraw"), s.find("#palleon-library-all-pagination").pagination("selectPage", 1))) : (s.find("#palleon-library-all-pagination").length && s.find("#palleon-library-all-pagination").pagination("destroy"), s.find("#palleon-library-all .palleon-masonry-item").hide().filter('[data-keyword*="' + t + '"]').show(), 0 === s.find("#palleon-library-all .palleon-masonry-item:visible").length && s.find("#palleon-library-all-noimg").removeClass("d-none")), a.prop("disabled", !0)
                }
        }), s.find("#palleon-library-my-refresh").on("click", function() {
            var a = e(this),
                t = {
                    action: "loadmyimgs",
                    nonce: palleonParams.nonce,
                    query: libraryMyRefresh.posts
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: t,
                type: "POST",
                beforeSend: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.loading)
                },
                success: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e ? (s.find("#palleon-library-my-noimg").addClass("d-none"), s.find("#palleon-library-my-pagination").remove(), s.find("#palleon-library-my").html(e), z.update(), D(s.find("#palleon-library-my"))) : (s.find("#palleon-library-my").html(""), s.find("#palleon-library-my-noimg").removeClass("d-none"))
                },
                error: function(e, t, n) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-library-all-refresh").on("click", function() {
            var a = e(this),
                t = {
                    action: "loadallimgs",
                    nonce: palleonParams.nonce,
                    query: libraryAllRefresh.posts
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: t,
                type: "POST",
                beforeSend: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.loading)
                },
                success: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e ? (s.find("#palleon-library-all-noimg").addClass("d-none"), s.find("#palleon-library-all-pagination").remove(), s.find("#palleon-library-all").html(e), z.update(), D(s.find("#palleon-library-all"))) : (s.find("#palleon-library-all").html(""), s.find("#palleon-library-all-noimg").removeClass("d-none"))
                },
                error: function(e, t, n) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-library-upload-img").on("change", function(a) {
            var t = e(this).parent().find("label"),
                n = this.files[0],
                l = new FormData;
            l.append("file", n), l.append("action", "uploadImgToLibrary"), l.append("nonce", palleonParams.nonce), e.ajax({
                url: palleonParams.ajaxurl,
                type: "POST",
                contentType: !1,
                processData: !1,
                cache: !1,
                data: l,
                beforeSend: function(e) {
                    t.css("opacity", .7), t.css("pointer-events", "none")
                },
                success: function(e) {
                    s.find("#palleon-library-my-refresh").trigger("click")
                },
                error: function(e, a, n) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error), t.css("opacity", 1), t.css("pointer-events", "auto")
                }
            }).done(function(e) {
                !1 === e.success ? toastr.error(e.data, palleonParams.error) : toastr.success(palleonParams.uploaded, palleonParams.success), t.css("opacity", 1), t.css("pointer-events", "auto")
            })
        }), s.find(".media-library-grid").on("click", ".palleon-library-delete", function() {
            if (window.confirm(palleonParams.answer2)) {
                var a = e(this).data("target"),
                    t = new FormData;
                t.append("target", a), t.append("action", "deleteImgFromLibrary"), t.append("nonce", palleonParams.nonce), e.ajax({
                    url: palleonParams.ajaxurl,
                    type: "POST",
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    data: t,
                    success: function(e) {
                        s.find("#palleon-library-my-refresh").trigger("click"), toastr.success(palleonParams.deleted, palleonParams.success)
                    },
                    error: function(e, a, t) {
                        e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                    }
                })
            }
        }), s.find(".svg-library-grid").on("click", ">.palleon-masonry-item>.palleon-masonry-item-inner", function() {
            var a = e(this).find("img").data("full");
            fabric.loadSVGFromURL(a, function(e, a) {
                var t = fabric.util.groupSVGElements(e, a);
                t.set("originX", "center"), t.set("originY", "center"), t.set("left", Re()[0] / 2), t.set("top", Re()[1] / 2), pe(t) ? (t.set("objectType", "element"), j.fire("palleon:history", {
                    type: "element",
                    text: palleonParams.added
                })) : (t.set("objectType", "customSVG"), j.fire("palleon:history", {
                    type: "customSVG",
                    text: palleonParams.added
                })), t.scaleToWidth(Re()[0] / 2), t.scaleToHeight(Re()[1] / 2), j.add(t), j.setActiveObject(t), j.requestRenderAll()
            }, function() {}, {
                crossOrigin: "anonymous"
            }), s.find("#modal-svg-library").hide()
        }), s.find("#palleon-svg-library-my-search").on("click", function() {
            var a = e(this).parent().find("input");
            if (s.find("#palleon-svg-library-my-noimg").addClass("d-none"), "" != a.val())
                if (e(this).hasClass("cancel")) e(this).removeClass("cancel"), e(this).find(".material-icons").html("search"), e(this).removeClass("danger"), e(this).addClass("primary"), a.val(""), s.find("#palleon-svg-library-my .palleon-masonry-item").show(), s.find("#palleon-svg-library-my-pagination").length && (s.find("#palleon-svg-library-my-pagination").pagination("redraw"), s.find("#palleon-svg-library-my-pagination").pagination("selectPage", 1)), a.prop("disabled", !1);
                else {
                    e(this).addClass("cancel"), e(this).find(".material-icons").html("close"), e(this).removeClass("primary"), e(this).addClass("danger");
                    var t = a.val().toLowerCase().replace(/\s/g, " ");
                    "" == t || t.length < 1 ? (s.find("#palleon-svg-library-my .palleon-masonry-item").show(), s.find("#palleon-svg-library-my-pagination").length && (s.find("#palleon-svg-library-my-pagination").pagination("redraw"), s.find("#palleon-svg-library-my-pagination").pagination("selectPage", 1))) : (s.find("#palleon-svg-library-my-pagination").length && s.find("#palleon-svg-library-my-pagination").pagination("destroy"), s.find("#palleon-svg-library-my .palleon-masonry-item").hide().filter('[data-keyword*="' + t + '"]').show(), 0 === s.find("#palleon-svg-library-my .palleon-masonry-item:visible").length && s.find("#palleon-svg-library-my-noimg").removeClass("d-none")), a.prop("disabled", !0)
                }
        }), s.find("#palleon-svg-library-all-search").on("click", function() {
            var a = e(this).parent().find("input");
            if (s.find("#palleon-library-all-noimg").addClass("d-none"), "" != a.val())
                if (e(this).hasClass("cancel")) e(this).removeClass("cancel"), e(this).find(".material-icons").html("search"), e(this).removeClass("danger"), e(this).addClass("primary"), a.val(""), s.find("#palleon-svg-library-all .palleon-masonry-item").show(), s.find("#palleon-svg-library-all-pagination").length && (s.find("#palleon-svg-library-all-pagination").pagination("redraw"), s.find("#palleon-svg-library-all-pagination").pagination("selectPage", 1)), a.prop("disabled", !1);
                else {
                    e(this).addClass("cancel"), e(this).find(".material-icons").html("close"), e(this).removeClass("primary"), e(this).addClass("danger");
                    var t = a.val().toLowerCase().replace(/\s/g, " ");
                    "" == t || t.length < 1 ? (s.find("#palleon-svg-library-all .palleon-masonry-item").show(), s.find("#palleon-svg-library-all-pagination").length && (s.find("#palleon-svg-library-all-pagination").pagination("redraw"), s.find("#palleon-svg-library-all-pagination").pagination("selectPage", 1))) : (s.find("#palleon-svg-library-all-pagination").length && s.find("#palleon-svg-library-all-pagination").pagination("destroy"), s.find("#palleon-svg-library-all .palleon-masonry-item").hide().filter('[data-keyword*="' + t + '"]').show(), 0 === s.find("#palleon-svg-library-all .palleon-masonry-item:visible").length && s.find("#palleon-svg-library-all-noimg").removeClass("d-none")), a.prop("disabled", !0)
                }
        }), s.find("#palleon-svg-library-my-refresh").on("click", function() {
            var a = e(this),
                t = {
                    action: "loadmyimgs",
                    nonce: palleonParams.nonce,
                    query: SVGlibraryMyRefresh.posts
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: t,
                type: "POST",
                beforeSend: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.loading)
                },
                success: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e ? (s.find("#palleon-svg-library-my-pagination").remove(), s.find("#palleon-svg-library-my").html(e), z.update(), D(s.find("#palleon-svg-library-my"))) : (s.find("#palleon-svg-library-my").html(""), s.find("#palleon-svg-library-my-noimg").removeClass("d-none"))
                },
                error: function(e, t, n) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-svg-library-all-refresh").on("click", function() {
            var a = e(this),
                t = {
                    action: "loadallimgs",
                    nonce: palleonParams.nonce,
                    query: SVGlibraryAllRefresh.posts
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: t,
                type: "POST",
                beforeSend: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.loading)
                },
                success: function(e) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e ? (s.find("#palleon-svg-library-all-pagination").remove(), s.find("#palleon-svg-library-all").html(e), z.update(), D(s.find("#palleon-svg-library-all"))) : (s.find("#palleon-svg-library-all").html(""), s.find("#palleon-svg-library-all-noimg").removeClass("d-none"))
                },
                error: function(e, t, n) {
                    a.html('<span class="material-icons">refresh</span>' + palleonParams.refresh), e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-svg-library-upload-img").on("change", function(a) {
            var t = this.files[0],
                n = new FormData;
            n.append("file", t), n.append("action", "uploadSVGToLibrary"), n.append("nonce", palleonParams.nonce), e.ajax({
                url: palleonParams.ajaxurl,
                type: "POST",
                contentType: !1,
                processData: !1,
                cache: !1,
                data: n,
                success: function(e) {
                    s.find("#palleon-svg-library-my-noimg").addClass("d-none"), s.find("#palleon-svg-library-my-refresh").trigger("click")
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                !1 === e.success ? toastr.error(e.data, palleonParams.error) : toastr.success(palleonParams.uploaded, palleonParams.success)
            })
        }), s.find(".svg-library-grid").on("click", ".palleon-library-delete", function() {
            if (window.confirm(palleonParams.answer2)) {
                var a = e(this).data("target"),
                    t = new FormData;
                t.append("target", a), t.append("action", "deleteImgFromLibrary"), t.append("nonce", palleonParams.nonce), e.ajax({
                    url: palleonParams.ajaxurl,
                    type: "POST",
                    contentType: !1,
                    processData: !1,
                    cache: !1,
                    data: t,
                    success: function(e) {
                        s.find("#palleon-svg-library-my-refresh").trigger("click"), toastr.success(palleonParams.deleted, palleonParams.success)
                    },
                    error: function(e, a, t) {
                        e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                    }
                })
            }
        }), s.find("#palleon-iconfinder").on("click", ".iconfinder-add", function() {
            var a = e(this).data("iconsource"),
                t = {
                    action: "iconfinderDownload",
                    nonce: palleonParams.nonce,
                    source: a
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: t,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#palleon-canvas-loader").css("display", "flex")
                },
                success: function(a) {
                    "{" == a.charAt(0) ? void 0 !== (a = e.parseJSON(a)).message ? toastr.error(a.message, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error) : fabric.loadSVGFromString(a, function(e, a) {
                        var t = fabric.util.groupSVGElements(e, a);
                        t.set("originX", "center"), t.set("originY", "center"), t.set("left", Re()[0] / 2), t.set("top", Re()[1] / 2), pe(t) ? (t.set("objectType", "element"), j.fire("palleon:history", {
                            type: "element",
                            text: palleonParams.added
                        })) : (t.set("objectType", "customSVG"), j.fire("palleon:history", {
                            type: "customSVG",
                            text: palleonParams.added
                        })), t.scaleToWidth(Re()[0] / 2), t.scaleToHeight(Re()[1] / 2), j.add(t), j.setActiveObject(t), j.requestRenderAll()
                    })
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#palleon-canvas-loader").hide()
            })
        }), s.find("#palleon-iconfinder-search").on("click", function() {
            var a = s.find("#iconfinder-style").val(),
                t = s.find("#iconfinder-category").val(),
                n = s.find("#palleon-iconfinder-keyword").val(),
                l = {
                    action: "iconfinderSearch",
                    nonce: palleonParams.nonce,
                    style: a,
                    category: t,
                    keyword: n
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: l,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#palleon-iconfinder").css("pointer-events", "none"), s.find("#palleon-iconfinder").css("opacity", .5)
                },
                success: function(e) {
                    e ? (s.find("#palleon-noiconfinder").hide(), s.find("#iconfinder-wrap").html(e), z.update()) : (s.find("#iconfinder-wrap").html(""), s.find("#palleon-noiconfinder").show())
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#palleon-iconfinder").css("pointer-events", "auto"), s.find("#palleon-iconfinder").css("opacity", 1)
            })
        }), s.find("#palleon-iconfinder").on("click", "#iconfinder-loadmore", function() {
            var a = e(this),
                t = a.attr("data-style"),
                n = a.attr("data-category"),
                l = a.attr("data-keyword"),
                i = a.attr("data-page"),
                o = {
                    action: "iconfinderLoadMore",
                    nonce: palleonParams.nonce,
                    style: t,
                    category: n,
                    page: i,
                    keyword: l
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: o,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#iconfinder-loadmore").prop("disabled", !0)
                },
                success: function(t) {
                    t ? "{" == t.charAt(0) ? void 0 !== (t = e.parseJSON(t)).message ? toastr.error(t.message, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error) : (s.find("#palleon-iconfinder-grid").append(t), z.update(), a.attr("data-page", parseInt(i) + 20)) : s.find("#iconfinder-loadmore").hide()
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#iconfinder-loadmore").prop("disabled", !1)
            })
        }), s.find("#palleon-iconfinder-keyword").on("keyup input", function() {
            "" == e(this).val() ? s.find("#palleon-iconfinder-search").prop("disabled", !0) : s.find("#palleon-iconfinder-search").prop("disabled", !1)
        }), s.find("#palleon-pexels-search").on("click", function() {
            var a = s.find("#pexels-orientation").val(),
                t = s.find("#pexels-color").val(),
                n = s.find("#palleon-pexels-keyword").val(),
                l = {
                    action: "pexelsSearch",
                    nonce: palleonParams.nonce,
                    orientation: a,
                    color: t,
                    keyword: n,
                    page: "1"
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: l,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#pexels").css("pointer-events", "none"), s.find("#pexels-menu,#pexels-output").css("opacity", .5)
                },
                success: function(e) {
                    e ? (s.find("#pexels-output").html(e), z.update()) : s.find("#pexels-output").html(e)
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#pexels").css("pointer-events", "auto"), s.find("#pexels-menu,#pexels-output").css("opacity", 1)
            })
        }), s.find("#palleon-pexels-keyword").on("keyup input", function() {
            "" == e(this).val() ? (s.find("#pexels-orientation").val(""), s.find("#pexels-color").val(""), s.find("#pexels-orientation").prop("disabled", !0), s.find("#pexels-color").prop("disabled", !0)) : (s.find("#pexels-orientation").prop("disabled", !1), s.find("#pexels-color").prop("disabled", !1))
        }), s.find("#pexels-output").on("click", "#pexels-loadmore", function() {
            var a = s.find("#pexels-orientation").val(),
                t = s.find("#pexels-color").val(),
                n = s.find("#palleon-pexels-keyword").val(),
                l = {
                    action: "pexelsSearch",
                    nonce: palleonParams.nonce,
                    orientation: a,
                    color: t,
                    keyword: n,
                    page: parseInt(e(this).data("page")) + 1
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: l,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#pexels").css("pointer-events", "none"), s.find("#pexels-menu,#pexels-output").css("opacity", .5), s.find("#pexels-loadmore").html(palleonParams.loading)
                },
                success: function(e) {
                    e ? (s.find("#pexels-loadmore").remove(), s.find("#pexels-output > .pexels-grid:last-child").after(e), z.update()) : s.find("#pexels-loadmore").prop("disabled", !1)
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#pexels").css("pointer-events", "auto"), s.find("#pexels-menu,#pexels-output").css("opacity", 1), s.find("#pexels-loadmore").html(palleonParams.loadmore)
            })
        }), s.find("#palleon-pixabay-search").on("click", function() {
            var a = s.find("#pixabay-orientation").val(),
                t = s.find("#pixabay-color").val(),
                n = s.find("#pixabay-category").val(),
                l = s.find("#palleon-pixabay-keyword").val(),
                i = {
                    action: "pixabaySearch",
                    nonce: palleonParams.nonce,
                    orientation: a,
                    color: t,
                    keyword: l,
                    category: n,
                    page: "1"
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: i,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#pixabay").css("pointer-events", "none"), s.find("#pixabay-menu,#pixabay-output").css("opacity", .5)
                },
                success: function(e) {
                    e ? (s.find("#pixabay-output").html(e), z.update()) : s.find("#pixabay-output").html(e)
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#pixabay").css("pointer-events", "auto"), s.find("#pixabay-menu,#pixabay-output").css("opacity", 1)
            })
        }), s.find("#pixabay-output").on("click", "#pixabay-loadmore", function() {
            var a = s.find("#pixabay-orientation").val(),
                t = s.find("#pixabay-color").val(),
                n = s.find("#pixabay-category").val(),
                l = s.find("#palleon-pixabay-keyword").val(),
                i = {
                    action: "pixabaySearch",
                    nonce: palleonParams.nonce,
                    orientation: a,
                    color: t,
                    keyword: l,
                    category: n,
                    page: parseInt(e(this).data("page")) + 1
                };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: i,
                type: "POST",
                beforeSend: function(e) {
                    s.find("#pixabay").css("pointer-events", "none"), s.find("#pixabay-menu,#pixabay-output").css("opacity", .5), s.find("#pixabay-loadmore").html(palleonParams.loading)
                },
                success: function(e) {
                    e ? (s.find("#pixabay-loadmore").remove(), s.find("#pixabay-output > .pixabay-grid:last-child").after(e), z.update()) : s.find("#pixabay-loadmore").prop("disabled", !1)
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            }).done(function(e) {
                s.find("#pixabay").css("pointer-events", "auto"), s.find("#pixabay-menu,#pixabay-output").css("opacity", 1), s.find("#pixabay-loadmore").html(palleonParams.loadmore)
            })
        }), s.find("#palleon-undo").on("click", function() {
            var e = s.find("#palleon-history-list li.active").next("li");
            e.length ? (e.find(".palleon-btn.primary").trigger("click"), s.find("#palleon-redo").prop("disabled", !1)) : s.find("#palleon-undo").prop("disabled", !0)
        }), s.find("#palleon-redo").on("click", function() {
            var e = s.find("#palleon-history-list li.active").prev("li");
            e.length ? (e.find(".palleon-btn.primary").trigger("click"), s.find("#palleon-undo").prop("disabled", !1)) : s.find("#palleon-redo").prop("disabled", !0)
        }), s.find("#palleon-history-list").on("click", ".palleon-btn.danger", function() {
            e(this).parent().parent().remove(), e("#palleon-history-list li").length || (s.find("#palleon-history").prop("disabled", !0), s.find("#palleon-undo").prop("disabled", !0), s.find("#palleon-redo").prop("disabled", !0), s.find(".palleon-modal").hide())
        }), s.find("#palleon-history-list").on("click", ".palleon-btn.primary", function() {
            s.find("#palleon-history-list li").removeClass("active"), e(this).parent().parent().addClass("active");
            var a = s.find("#palleon-history-list li.active").next("li"),
                t = s.find("#palleon-history-list li.active").prev("li");
            a.length ? s.find("#palleon-undo").prop("disabled", !1) : s.find("#palleon-undo").prop("disabled", !0), t.length ? s.find("#palleon-redo").prop("disabled", !1) : s.find("#palleon-redo").prop("disabled", !0);
            var n = JSON.parse(e(this).parent().find("script").html());
            s.find(".palleon-modal").hide(), G(n.backgroundImage.src, function(e) {
                n.backgroundImage.src = e, oe(n), s.find("#palleon-canvas-loader").hide()
            })
        }), s.find("#palleon-clear-history").on("click", function() {
            window.confirm(palleonParams.answer3) && (s.find("#palleon-history-list li").remove(), s.find("#palleon-history").prop("disabled", !0), s.find("#palleon-undo").prop("disabled", !0), s.find("#palleon-redo").prop("disabled", !0), s.find(".palleon-modal").hide())
        }), j.on("palleon:history", function(e) {
            ge(fe(e.type) + " " + e.text)
        });
        var me = !1;
        j.on("mouse:up", function(e) {
            var a = e.target;
            if (null !== a) {
                var t = a.objectType;
                me && ge(fe(t) + " " + palleonParams.moved)
            }
            void 0 !== j.overlayImage && null !== j.overlayImage && j.overlayImage.set("opacity", 1)
        }), j.on("object:moving", function(e) {
            me = !0, void 0 !== j.overlayImage && null !== j.overlayImage && j.overlayImage.set("opacity", .7);
            var a = v,
                t = b;
            0 != y && 180 != y && -180 != y || (a = b, t = v);
            var n = e.target,
                l = n.getScaledWidth(),
                i = n.getScaledHeight();
            n.isPartiallyOnScreen() && "clipPath" == n.objectType && (n.top < 0 && n.left < 0 ? (n.top = 0, n.left = 0, n.lockMovementX = !0, n.lockMovementY = !0) : n.top < 0 && l + n.left > a ? (n.top = 0, n.left = a - l, n.lockMovementX = !0, n.lockMovementY = !0) : i + n.top > t && n.left < 0 ? (n.top = t - i, n.left = 0, n.lockMovementX = !0, n.lockMovementY = !0) : i + n.top > t && l + n.left > a ? (n.top = t - i, n.left = a - l, n.lockMovementX = !0, n.lockMovementY = !0) : n.top < 0 ? (n.top = 0, n.lockMovementY = !0) : n.left < 0 ? (n.left = 0, n.lockMovementX = !0) : l + n.left > a ? (n.left = a - l, n.lockMovementX = !0) : i + n.top > t && (n.top = t - i, n.lockMovementY = !0), n.setCoords())
        }), j.on("object:scaling", function(e) {
            var a = v,
                t = b;
            0 != y && 180 != y && -180 != y || (a = b, t = v);
            var n = e.target,
                l = n.getScaledWidth(),
                i = n.getScaledHeight();
            n.isPartiallyOnScreen() && "clipPath" == n.objectType && (l >= a && (n.set({
                scaleX: a / n.width
            }), n.lockScalingX = !0), i >= t && (n.set({
                scaleY: t / n.height
            }), n.lockScalingY = !0), n.top < 0 && (n.top = 0, n.lockScalingX = !0, n.lockScalingY = !0, n.setCoords()), n.left < 0 && (n.left = 0, n.lockScalingX = !0, n.lockScalingY = !0, n.setCoords()), l + n.left > a && (n.left = a - l, n.lockScalingX = !0, n.lockScalingY = !0, n.setCoords()), i + n.top > t && (n.top = t - i, n.lockScalingX = !0, n.lockScalingY = !0, n.setCoords()))
        }), j.on("object:added", function(a) {
            var t, n, l = a.target;
            if ("clipPath" != l.objectType && "watermark" != l.objectType) {
                !0 === j.isDrawingMode && (l.set("objectType", "drawing"), l.set("selectable", !0), l.set("lockScalingX", !0), l.set("lockScalingY", !0), l.set("lockRotation", !0), l.setControlsVisibility({
                    mt: !1,
                    mb: !1,
                    ml: !1,
                    mr: !1,
                    bl: !1,
                    br: !1,
                    tl: !1,
                    tr: !1,
                    mtr: !1
                }));
                var i = j.getObjects().indexOf(l),
                    o = "",
                    r = "Object",
                    d = "category",
                    c = "layer-visible",
                    p = "visibility",
                    f = "layer-unlocked",
                    g = "lock_open";
                0 == l.visible && (c = "layer-hidden", p = "visibility_off"), 0 == l.selectable && (f = "layer-locked", g = "lock"), l.set("id", (new Date).getTime()), s.find("#palleon-layers > li").removeClass("active"), "textbox" == l.objectType ? (r = l.text, d = "title") : "drawing" == l.objectType ? (r = palleonParams.freeDrawing, d = "brush") : "frame" == l.objectType ? (r = palleonParams.frame, d = "wallpaper") : "image" == l.objectType ? (r = palleonParams.image, d = "image") : "group" == l.objectType ? (r = palleonParams.group || "Group", d = "group_work") : "circle" == l.objectType ? r = palleonParams.circle : "square" == l.objectType ? r = palleonParams.square : "rectangle" == l.objectType ? r = palleonParams.rectangle : "triangle" == l.objectType ? r = palleonParams.triangle : "ellipse" == l.objectType ? r = palleonParams.ellipse : "trapezoid" == l.objectType ? r = palleonParams.trapezoid : "pentagon" == l.objectType ? r = palleonParams.pentagon : "octagon" == l.objectType ? r = palleonParams.octagon : "emerald" == l.objectType ? r = palleonParams.emerald : "diamond" == l.objectType ? r = palleonParams.diamond : "parallelogram" == l.objectType ? r = palleonParams.parallelogram : "star" == l.objectType ? r = palleonParams.star : "element" == l.objectType ? (r = palleonParams.element, d = "star") : "customShape" == l.objectType ? r = palleonParams.customShape : "customSVG" == l.objectType ? r = palleonParams.customSvg : "printarea" == l.objectType ? (r = palleonParams.printArea, d = "print") : "app" == l.objectType && (r = palleonParams.app, d = "apps"), "layerName" in l && (r = l.layerName), o = "frontend" == palleonParams.version && "printarea" == l.objectType ? '<li id="' + l.id + '" data-type="' + l.objectType + '" class="layer-' + l.objectType + ' disabled" data-sort="' + i + '"><span class="material-icons">' + d + '</span><div class="layer-name">' + r + '</div><a class="material-icons layer-visibility ' + c + '" title="' + palleonParams.showhide + '">' + p + "</a></li>" : '<li id="' + l.id + '" data-type="' + l.objectType + '" class="layer-' + l.objectType + ' active" data-sort="' + i + '"><span class="material-icons">' + d + '</span><input type="text" class="layer-name" autocomplete="off" value="' + r + '" /><span class="material-icons layer-settings">settings</span><div class="layer-icons"><a class="material-icons lock-layer ' + f + '" title="' + palleonParams.lockunlock + '">' + g + '</a><a class="material-icons text-success duplicate-layer" title="' + palleonParams.duplicate + '">content_copy</a><a class="material-icons layer-visibility ' + c + '" title="' + palleonParams.showhide + '">' + p + '</a><a class="material-icons text-danger delete-layer" title="' + palleonParams.delete + '">clear</a></div></li>', s.find("#palleon-layers").prepend(o), t = l.id, (n = s.find("#palleon-layers #" + t)).find("a.delete-layer").on("click", function(e) {
                        e.preventDefault(), j.fire("palleon:history", {
                            type: n.data("type"),
                            text: palleonParams.removed
                        });
                        var a = j.getObjects();
                        a.filter(e => e.id == t).forEach(e => j.remove(e)), n.remove(), j.requestRenderAll(), s.find("#palleon-layers").sortable("refresh"), ue()
                    }),
                    function(e) {
                        var a = s.find("#palleon-layers #" + e);
                        a.find("a.duplicate-layer").on("click", function(t) {
                            t.preventDefault();
                            var n = j.getObjects();
                            n.filter(a => a.id == e).forEach(e => e.clone(function(a) {
                                a.set("id", (new Date).getTime()), a.set("objectType", e.objectType), j.add(a), j.setActiveObject(a)
                            })), j.requestRenderAll(), s.find("#palleon-layers").sortable("refresh"), j.fire("palleon:history", {
                                type: a.data("type"),
                                text: palleonParams.added
                            })
                        })
                    }(l.id),
                    function(a) {
                        var t = a.id;
                        s.find("#palleon-layers #" + t).find("a.layer-visibility").on("click", function(n) {
                            n.preventDefault();
                            var l = j.getObjects();
                            e(this).hasClass("layer-visible") ? (e(this).removeClass("layer-visible"), e(this).addClass("layer-hidden"), e(this).html("visibility_off"), "frontend" == palleonParams.version && "printarea" == a.objectType ? (he = a.strokeWidth, l.filter(e => e.id == t).forEach(e => e.set("strokeWidth", 0))) : l.filter(e => e.id == t).forEach(e => e.set("visible", !1))) : e(this).hasClass("layer-hidden") && (e(this).removeClass("layer-hidden"), e(this).addClass("layer-visible"), e(this).html("visibility"), "frontend" == palleonParams.version && "printarea" == a.objectType ? l.filter(e => e.id == t).forEach(e => e.set("strokeWidth", he)) : l.filter(e => e.id == t).forEach(e => e.set("visible", !0))), j.requestRenderAll()
                        })
                    }(l),
                    function(a) {
                        s.find("#palleon-layers #" + a).find("a.lock-layer").on("click", function(a) {
                            a.preventDefault();
                            var t = j.getActiveObject();
                            e(this).hasClass("layer-unlocked") ? (e(this).removeClass("layer-unlocked"), e(this).addClass("layer-locked"), e(this).html("lock"), t.set({
                                lockMovementX: !0,
                                lockMovementY: !0,
                                lockRotation: !0,
                                selectable: !1
                            })) : e(this).hasClass("layer-locked") && (e(this).removeClass("layer-locked"), e(this).addClass("layer-unlocked"), e(this).html("lock_open"), t.set({
                                lockMovementX: !1,
                                lockMovementY: !1,
                                lockRotation: !1,
                                selectable: !0
                            })), j.requestRenderAll()
                        })
                    }(l.id),
                    function(a) {
                        var t = s.find("#palleon-layers #" + a);
                        "frontend" == palleonParams.version && "printarea" == t.data("type") || t.on("click", function(a) {
                            var t = j.getObjects(),
                                n = e(this).attr("id");
                            t.filter(e => e.id == n).forEach(e => j.setActiveObject(e)), s.find("#palleon-layers > li").removeClass("active"), e(this).addClass("active"), j.requestRenderAll()
                        })
                    }(l.id),
                    function(a) {
                        s.find("#palleon-layers #" + a).find(".layer-name").on("change", function(a) {
                            var t = j.getObjects(),
                                n = e(this).parent("li").attr("id");
                            t.filter(e => e.id == n).forEach(a => a.set({
                                layerName: e(this).val()
                            }))
                        })
                    }(l.id), s.find("#palleon-layers").sortable("refresh"), ue(), "printarea" != l.objectType && "clipPath" != l.objectType ? (function(e) {
                        e.controls.deleteControl = new fabric.Control({
                            x: 0,
                            y: .5,
                            offsetY: 22,
                            offsetX: 14,
                            cursorStyle: "pointer",
                            mouseUpHandler: _,
                            render: V,
                            cornerSize: 24
                        })
                    }(l), function(e) {
                        // Agregar control de duplicar para objetos individuales
                        e.controls.cloneControl = new fabric.Control({
                            x: 0,
                            y: .5,
                            offsetY: 22,
                            offsetX: -14,
                            cursorStyle: "pointer",
                            mouseUpHandler: Z,
                            render: K,
                            cornerSize: 24
                        });
                    }(l)) : function(e) {
                        e.controls = {
                            ...fabric.Rect.prototype.controls,
                            mtr: new fabric.Control({
                                visible: !1
                            }),
                            ml: new fabric.Control({
                                visible: !1
                            }),
                            mb: new fabric.Control({
                                visible: !1
                            }),
                            mr: new fabric.Control({
                                visible: !1
                            }),
                            mt: new fabric.Control({
                                visible: !1
                            }),
                            tl: new fabric.Control({
                                visible: !1
                            }),
                            bl: new fabric.Control({
                                visible: !1
                            }),
                            tr: new fabric.Control({
                                visible: !1
                            }),
                            br: new fabric.Control({
                                visible: !1
                            })
                        }
                    }(l)
            }
        }), j.on("object:modified", function(e) {
            var a = e.target;
            "textbox" == a.objectType && a.id && (s.find("#palleon-layers #" + a.id + " .layer-name").html(a.text), s.find("#text-rotate").val(parseInt(j.getActiveObject().angle)), s.find("#text-rotate").parent().parent().find(".slider-label span").html(parseInt(j.getActiveObject().angle))), "image" == a.objectType && a.id && (s.find("#img-rotate").val(parseInt(j.getActiveObject().angle)), s.find("#img-rotate").parent().parent().find(".slider-label span").html(parseInt(j.getActiveObject().angle))), "element" == a.objectType && a.id && (s.find("#element-rotate").val(parseInt(j.getActiveObject().angle)), s.find("#element-rotate").parent().parent().find(".slider-label span").html(parseInt(j.getActiveObject().angle))), "customSVG" == a.objectType && a.id && (s.find("#customsvg-rotate").val(parseInt(j.getActiveObject().angle)), s.find("#customsvg-rotate").parent().parent().find(".slider-label span").html(parseInt(j.getActiveObject().angle))), q.includes(a.objectType) && a.id && (s.find("#shape-rotate").val(parseInt(j.getActiveObject().angle)), s.find("#shape-rotate").parent().parent().find(".slider-label span").html(parseInt(j.getActiveObject().angle))), "clipPath" == a.objectType && (a.lockScalingX = !1, a.lockScalingY = !1, a.lockMovementX = !1, a.lockMovementY = !1), g && function(e) {
                e.isContainedWithinObject(n) ? (o = e.get("top"), r = e.get("left"), l = e.get("scaleX"), i = e.get("scaleY")) : (e.top = o, e.left = r, e.scaleX = l, e.scaleY = i, e.setCoords(), e.saveState());
                e.set({
                    borderColor: "#4affff"
                }), j.requestRenderAll(), je(j.getItemById("cropped"))
            }(a)
        }), j.on("erasing:end", function() {
            ge('<span class="material-icons">brush</span>' + palleonParams.erased)
        }), j.on("path:created", function(e) {
            if (!0 === j.isDrawingMode) {
                var a = j.getObjects().filter(e => "printarea" == e.objectType)[0];
                if (a) {
                    var t = j.getObjects().filter(e => "drawing" == e.objectType).slice(-1)[0];
                    if (!t.isContainedWithinObject(a)) j.remove(t), s.find("#palleon-layers #" + t.id).find("a.delete-layer").trigger("click")
                } else ge('<span class="material-icons">brush</span>' + palleonParams.freeDrawing + " " + palleonParams.added)
            }
        }), s.find(".palleon-horizontal-center").on("click", function() {
            var e = j.getActiveObject(),
                a = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            a && "printarea" != e.objectType ? (e.set("originX", "left"), e.set("left", a.left - a.width / 2 + (a.getScaledWidth() - e.getScaledWidth()) / 2)) : (e.set("originX", "center"), e.set("left", Re()[0] / 2)), j.requestRenderAll()
        }), s.find(".palleon-vertical-center").on("click", function() {
            var e = j.getActiveObject(),
                a = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            a && "printarea" != e.objectType ? (e.set("top", a.top - a.height / 2 + (a.getScaledHeight() - e.getScaledHeight()) / 2), e.set("top", Re()[1] / 2)) : (e.set("originY", "center"), e.set("top", Re()[1] / 2)), j.requestRenderAll()
        }), j.on("selection:created", function(e) {
            be(e.selected);
            // Limpiar controles previos
            var objects = j.getObjects();
            objects.forEach(function(obj) {
                if (obj.controls.groupControl) {
                    delete obj.controls.groupControl;
                }
                if (obj.controls.ungroupControl) {
                    delete obj.controls.ungroupControl;
                }
            });
            
            // Agregar controles apropiados según el tipo de selección
            var activeObject = j.getActiveObject();
            if (activeObject) {
                if (activeObject.type === 'activeSelection') {
                    // Para múltiples objetos seleccionados - mostrar control de agrupamiento
                    activeObject.controls.groupControl = new fabric.Control({
                        x: 0,
                        y: .5,
                        offsetY: 22,
                        offsetX: -42, // Posición a la izquierda del duplicar
                        cursorStyle: "pointer",
                        mouseUpHandler: groupControlHandler,
                        render: renderGroupControl,
                        cornerSize: 24
                    });
                } else if (activeObject.type === 'group') {
                    // Para grupos - mostrar control de desagrupamiento
                    activeObject.controls.ungroupControl = new fabric.Control({
                        x: 0,
                        y: .5,
                        offsetY: 22,
                        offsetX: -42,
                        cursorStyle: "pointer",
                        mouseUpHandler: ungroupControlHandler,
                        render: renderUngroupControl,
                        cornerSize: 24
                    });
                }
            }
        }), j.on("selection:updated", function(e) {
            be(e.selected);
            // Limpiar controles previos
            var objects = j.getObjects();
            objects.forEach(function(obj) {
                if (obj.controls.groupControl) {
                    delete obj.controls.groupControl;
                }
                if (obj.controls.ungroupControl) {
                    delete obj.controls.ungroupControl;
                }
            });
            
            // Agregar controles apropiados según el tipo de selección
            var activeObject = j.getActiveObject();
            if (activeObject) {
                if (activeObject.type === 'activeSelection') {
                    // Para múltiples objetos seleccionados - mostrar control de agrupamiento
                    activeObject.controls.groupControl = new fabric.Control({
                        x: 0,
                        y: .5,
                        offsetY: 22,
                        offsetX: -42, // Posición a la izquierda del duplicar
                        cursorStyle: "pointer",
                        mouseUpHandler: groupControlHandler,
                        render: renderGroupControl,
                        cornerSize: 24
                    });
                } else if (activeObject.type === 'group') {
                    // Para grupos - mostrar control de desagrupamiento
                    activeObject.controls.ungroupControl = new fabric.Control({
                        x: 0,
                        y: .5,
                        offsetY: 22,
                        offsetX: -42,
                        cursorStyle: "pointer",
                        mouseUpHandler: ungroupControlHandler,
                        render: renderUngroupControl,
                        cornerSize: 24
                    });
                }
            }
        }), j.on("selection:cleared", function() {
            // Limpiar todos los controles de agrupamiento/desagrupamiento cuando se limpia la selección
            var objects = j.getObjects();
            objects.forEach(function(obj) {
                if (obj.controls.groupControl) {
                    delete obj.controls.groupControl;
                }
                if (obj.controls.ungroupControl) {
                    delete obj.controls.ungroupControl;
                }
            });
            
            g ? (je(n), s.find("#crop-image-object").removeClass("d-none"), s.find("#crop-image-object-selection").addClass("d-none"), s.find("#palleon-icon-menu, #palleon-top-bar, #palleon-right-col, #palleon-img-upload-wrap, #palleon-img-media-library, #palleon-image-settings > *, .palleon-content-bar, #agama-print-areas").css("pointer-events", "auto")) : (s.find("#palleon-text-settings").hide(), s.find("#palleon-image-settings").hide(), s.find("#palleon-shape-settings").hide(), s.find("#palleon-custom-element-options").hide(), s.find("#palleon-shape-settings-info").show(), s.find("#palleon-custom-svg-options").hide(), s.find("#palleon-layers > li").removeClass("active"))
        }), s.find("#palleon-layers").sortable({
            items: "li:not(.disabled)",
            placeholder: "layer-placeholder",
            axis: "y",
            update: function(a, t) {
                var n = j.getObjects();
                s.find("#palleon-layers li:not(.disabled)").each(function(a, t) {
                    e(this).attr("data-sort", a + 1), n.filter(e => e.id == t.id).forEach(e => e.moveTo(-(a + 1)))
                }), j.requestRenderAll()
            },
            create: function(e, a) {
                ue()
            }
        }).disableSelection(), s.find("#palleon-layers").on("click", ".layer-settings", function() {
            var a = e(this).next();
            e(this).hasClass("active") ? (e(this).removeClass("active"), a.hide()) : (s.find("#palleon-layers .layer-icons").hide(), s.find("#palleon-layers .layer-settings").removeClass("active"), e(this).addClass("active"), a.show())
        });
        var he = "";

        function ue() {
            s.find("#palleon-layers li").length ? (s.find("#palleon-no-layer").hide(), s.find("#palleon-layer-delete-wrap").css("visibility", "visible")) : (s.find("#palleon-no-layer").show(), s.find("#palleon-layer-delete-wrap").css("visibility", "hidden"))
        }

        function be(a) {
            if (!g)
                if (s.find("#palleon-layers li").removeClass("active"), a.length >= 2)
                    for (var t = 0; t < a.length; t++) s.find("#palleon-layers #" + a[t].id).addClass("active");
                else void 0 !== (a = a[0]) && a.objectType ? ("textbox" == a.objectType ? (s.find("#palleon-text-settings").show(), function(e) {
                    s.find("#palleon-text-input").val(e.text), s.find("#palleon-font-family").val(e.fontFamily), s.find("#palleon-font-family").trigger("change"), "none" == e.gradientFill || "" == e.gradientFill || void 0 === e.gradientFill ? (s.find("#palleon-text-gradient").val("none"), s.find("#palleon-text-color").spectrum("set", e.fill)) : "vertical" == e.gradientFill ? s.find("#palleon-text-gradient").val("vertical") : "horizontal" == e.gradientFill ? s.find("#palleon-text-gradient").val("horizontal") : "diagonal" == e.gradientFill && s.find("#palleon-text-gradient").val("diagonal");
                    "vertical" != e.gradientFill && "horizontal" != e.gradientFill && "diagonal" != e.gradientFill || (4 == e.fill.colorStops.length ? (s.find("#text-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#text-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#text-gradient-color-3").spectrum("set", e.fill.colorStops[2].color), s.find("#text-gradient-color-4").spectrum("set", e.fill.colorStops[3].color)) : 3 == e.fill.colorStops.length ? (s.find("#text-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#text-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#text-gradient-color-3").spectrum("set", e.fill.colorStops[2].color), s.find("#text-gradient-color-4").spectrum("set", "")) : 2 == e.fill.colorStops.length && (s.find("#text-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#text-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#text-gradient-color-3").spectrum("set", ""), s.find("#text-gradient-color-4").spectrum("set", "")));
                    s.find("#palleon-text-gradient").trigger("change"), "bold" == e.fontWeight ? s.find("#format-bold").addClass("active") : s.find("#format-bold").removeClass("active");
                    "italic" == e.fontStyle ? s.find("#format-italic").addClass("active") : s.find("#format-italic").removeClass("active");
                    1 == e.underline ? s.find("#format-underline").addClass("active") : s.find("#format-underline").removeClass("active");
                    "left" == e.textAlign && (s.find(".format-align").removeClass("active"), s.find("#format-align-left").addClass("active"));
                    "right" == e.textAlign && (s.find(".format-align").removeClass("active"), s.find("#format-align-right").addClass("active"));
                    "center" == e.textAlign && (s.find(".format-align").removeClass("active"), s.find("#format-align-center").addClass("active"));
                    "justify" == e.textAlign && (s.find(".format-align").removeClass("active"), s.find("#format-align-justify").addClass("active"));
                    s.find("#palleon-font-size").val(e.fontSize), s.find("#palleon-outline-size").val(e.strokeWidth), s.find("#palleon-line-height").val(e.lineHeight), s.find("#palleon-letter-spacing").val(e.charSpacing), s.find("#palleon-outline-color").spectrum("set", e.stroke), s.find("#palleon-text-background").spectrum("set", e.textBackgroundColor), null == e.shadow ? s.find("#palleon-text-shadow").prop("checked", !1) : (s.find("#palleon-text-shadow").prop("checked", !0), s.find("#text-shadow-color").spectrum("set", e.shadow.color), s.find("#text-shadow-blur").val(e.shadow.blur), s.find("#text-shadow-offset-x").val(e.shadow.offsetX), s.find("#text-shadow-offset-y").val(e.shadow.offsetY));
                    s.find("#palleon-text-shadow").trigger("change"), 1 == e.flipX ? s.find("#text-flip-x").addClass("active") : s.find("#text-flip-x").removeClass("active");
                    1 == e.flipY ? s.find("#text-flip-y").addClass("active") : s.find("#text-flip-y").removeClass("active");
                    s.find("#text-skew-x").val(e.skewX), s.find("#text-skew-x").parent().parent().find(".slider-label span").html(e.skewX), s.find("#text-skew-y").val(e.skewY), s.find("#text-skew-y").parent().parent().find(".slider-label span").html(e.skewY), s.find("#text-rotate").val(parseInt(e.angle)), s.find("#text-rotate").parent().parent().find(".slider-label span").html(parseInt(e.angle))
                }(a), s.find("#palleon-btn-text").hasClass("active") || s.find("#palleon-btn-text").trigger("click"), s.find("#palleon-font-family").trigger("change")) : s.find("#palleon-text-settings").hide(), "image" == a.objectType ? (s.find("#palleon-image-settings").show(), function(e) {
                    "" == e.filters ? s.find("#image-filter").val("none") : s.find("#image-filter").val(e.filters[0].type.toLowerCase());
                    void 0 === e.clipPath ? s.find("#palleon-img-mask").val("none") : null == e.clipPath ? s.find("#palleon-img-mask").val("none") : void 0 === e.clipPath.maskType ? s.find("#palleon-img-mask").val("none") : null == e.clipPath.maskType ? s.find("#palleon-img-mask").val("none") : s.find("#palleon-img-mask").val(e.clipPath.maskType);
                    s.find("#img-border-radius").val(e.roundedCorders), s.find("#img-border-radius").parent().parent().find(".slider-label span").html(e.roundedCorders), null == e.shadow ? s.find("#palleon-image-shadow").prop("checked", !1) : (s.find("#palleon-image-shadow").prop("checked", !0), s.find("#image-shadow-color").spectrum("set", e.shadow.color), s.find("#image-shadow-blur").val(e.shadow.blur), s.find("#image-shadow-offset-x").val(e.shadow.offsetX), s.find("#image-shadow-offset-y").val(e.shadow.offsetY));
                    s.find("#palleon-image-shadow").trigger("change"), s.find("#img-border-width").val(e.strokeWidth), s.find("#img-border-color").spectrum("set", e.stroke), s.find("#img-opacity").val(e.opacity), s.find("#img-opacity").parent().parent().find(".slider-label span").html(e.opacity), s.find("#img-skew-x").val(e.skewX), s.find("#img-skew-x").parent().parent().find(".slider-label span").html(e.skewX), s.find("#img-skew-y").val(e.skewY), s.find("#img-skew-y").parent().parent().find(".slider-label span").html(e.skewY), s.find("#img-rotate").val(parseInt(e.angle)), s.find("#img-rotate").parent().parent().find(".slider-label span").html(parseInt(e.angle))
                }(a), s.find("#palleon-btn-image").hasClass("active") || (s.find("#palleon-btn-image").trigger("click"), s.find("#palleon-img-mode").trigger("click"))) : s.find("#palleon-image-settings").hide(), "frame" == a.objectType && (s.find("#palleon-btn-frames").hasClass("active") || s.find("#palleon-btn-frames").trigger("click"), s.find("#palleon-frame-setting-tab").trigger("click"), pe(a) ? s.find("#palleon-frame-single-color").show() : s.find("#palleon-frame-single-color").hide()), "element" == a.objectType ? (s.find("#palleon-custom-element-options").show(), function(e) {
                    "none" == e.gradientFill || "" == e.gradientFill || void 0 === e.gradientFill ? (s.find("#palleon-element-gradient").val("none"), s.find("#palleon-element-color").spectrum("set", e.fill)) : "vertical" == e.gradientFill ? s.find("#palleon-element-gradient").val("vertical") : "horizontal" == e.gradientFill ? s.find("#palleon-element-gradient").val("horizontal") : "diagonal" == e.gradientFill && s.find("#palleon-element-gradient").val("diagonal");
                    "vertical" != e.gradientFill && "horizontal" != e.gradientFill && "diagonal" != e.gradientFill || (4 == e.fill.colorStops.length ? (s.find("#element-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#element-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#element-gradient-color-3").spectrum("set", e.fill.colorStops[2].color), s.find("#element-gradient-color-4").spectrum("set", e.fill.colorStops[3].color)) : 3 == e.fill.colorStops.length ? (s.find("#element-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#element-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#element-gradient-color-3").spectrum("set", e.fill.colorStops[2].color), s.find("#element-gradient-color-4").spectrum("set", "")) : 2 == e.fill.colorStops.length && (s.find("#element-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#element-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#element-gradient-color-3").spectrum("set", ""), s.find("#element-gradient-color-4").spectrum("set", "")));
                    s.find("#palleon-element-gradient").trigger("change"), s.find("#element-opacity").val(e.opacity), s.find("#element-opacity").parent().parent().find(".slider-label span").html(e.opacity), s.find("#element-skew-x").val(e.skewX), s.find("#element-skew-x").parent().parent().find(".slider-label span").html(e.skewX), s.find("#element-skew-y").val(e.skewY), s.find("#element-skew-y").parent().parent().find(".slider-label span").html(e.skewY), s.find("#element-rotate").val(parseInt(e.angle)), s.find("#element-rotate").parent().parent().find(".slider-label span").html(parseInt(e.angle)), null == e.shadow ? s.find("#palleon-element-shadow").prop("checked", !1) : (s.find("#palleon-element-shadow").prop("checked", !0), s.find("#element-shadow-color").spectrum("set", e.shadow.color), s.find("#element-shadow-blur").val(e.shadow.blur), s.find("#element-shadow-offset-x").val(e.shadow.offsetX), s.find("#element-shadow-offset-y").val(e.shadow.offsetY));
                    s.find("#palleon-element-shadow").trigger("change")
                }(a), s.find("#palleon-btn-elements").hasClass("active") || s.find("#palleon-btn-elements").trigger("click"), s.find("#palleon-custom-svg-open").trigger("click")) : s.find("#palleon-custom-element-options").hide(), "customSVG" == a.objectType ? (s.find("#palleon-custom-svg-options").show(), function(a) {
                    if (a._objects) {
                        var t = [],
                            n = "";
                        e.each(a._objects, function(e, a) {
                            -1 === t.indexOf(a.get("fill")) && t.push(a.get("fill"))
                        }), e.each(t, function(e, a) {
                            if ("string" == typeof a || a instanceof String) {
                                var t = e + 1;
                                n += '<div class="palleon-control-wrap control-text-color"><label class="palleon-control-label">' + palleonParams.fillColor + " " + t + '</label><div class="palleon-control"><input id="customsvg-color-' + t + '" type="text" data-color="' + a + '" class="customsvg-color palleon-colorpicker disallow-empty" autocomplete="off" value="' + a + '" /></div></div>'
                            }
                        }), s.find("#customsvg-colors").html(n), s.find(".customsvg-color").spectrum({
                            allowEmpty: !1,
                            showInitial: !0,
                            hideAfterPaletteSelect: !0,
                            showSelectionPalette: !0,
                            localStorageKey: "spectrum.palleon",
                            showAlpha: "true" === palleonParams.alphaColor
                        })
                    }
                    s.find("#palleon-text-shadow").trigger("change"), s.find("#customsvg-opacity").val(a.opacity), s.find("#customsvg-opacity").parent().parent().find(".slider-label span").html(a.opacity), s.find("#customsvg-skew-x").val(a.skewX), s.find("#customsvg-skew-x").parent().parent().find(".slider-label span").html(a.skewX), s.find("#customsvg-skew-y").val(a.skewY), s.find("#customsvg-skew-y").parent().parent().find(".slider-label span").html(a.skewY), s.find("#customsvg-rotate").val(parseInt(a.angle)), s.find("#customsvg-rotate").parent().parent().find(".slider-label span").html(parseInt(a.angle))
                }(a), s.find("#palleon-btn-elements").hasClass("active") || s.find("#palleon-btn-elements").trigger("click"), s.find("#palleon-custom-svg-open").trigger("click")) : s.find("#palleon-custom-svg-options").hide(), q.includes(a.objectType) ? ("printarea" == a.objectType ? (s.find("#shape-opacity").parent().parent().hide(), s.find("#shape-skew-x").parent().parent().hide(), s.find("#shape-skew-y").parent().parent().hide(), s.find("#shape-rotate").parent().parent().hide()) : (s.find("#shape-opacity").parent().parent().show(), s.find("#shape-skew-x").parent().parent().show(), s.find("#shape-skew-y").parent().parent().show(), s.find("#shape-rotate").parent().parent().show()), X.includes(a.objectType) ? s.find("#shape-custom-width-wrap").show() : s.find("#shape-custom-width-wrap").hide(), s.find("#palleon-shape-settings").show(), function(e) {
                    s.find("#palleon-shape-settings-info").hide(), s.find("#shape-outline-width").val(e.strokeWidth), "none" == e.gradientFill || "" == e.gradientFill || void 0 === e.gradientFill ? (s.find("#palleon-shape-gradient").val("none"), s.find("#palleon-shape-color").spectrum("set", e.fill)) : "vertical" == e.gradientFill ? s.find("#palleon-shape-gradient").val("vertical") : "horizontal" == e.gradientFill ? s.find("#palleon-shape-gradient").val("horizontal") : "diagonal" == e.gradientFill && s.find("#palleon-shape-gradient").val("diagonal");
                    "vertical" != e.gradientFill && "horizontal" != e.gradientFill && "diagonal" != e.gradientFill || (4 == e.fill.colorStops.length ? (s.find("#shape-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#shape-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#shape-gradient-color-3").spectrum("set", e.fill.colorStops[2].color), s.find("#shape-gradient-color-4").spectrum("set", e.fill.colorStops[3].color)) : 3 == e.fill.colorStops.length ? (s.find("#shape-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#shape-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#shape-gradient-color-3").spectrum("set", e.fill.colorStops[2].color), s.find("#shape-gradient-color-4").spectrum("set", "")) : 2 == e.fill.colorStops.length && (s.find("#shape-gradient-color-1").spectrum("set", e.fill.colorStops[0].color), s.find("#shape-gradient-color-2").spectrum("set", e.fill.colorStops[1].color), s.find("#shape-gradient-color-3").spectrum("set", ""), s.find("#shape-gradient-color-4").spectrum("set", "")));
                    s.find("#palleon-shape-gradient").trigger("change"), s.find("#shape-outline-color").spectrum("set", e.stroke), null == e.shadow ? s.find("#palleon-shape-shadow").prop("checked", !1) : (s.find("#palleon-shape-shadow").prop("checked", !0), s.find("#shape-shadow-color").spectrum("set", e.shadow.color), s.find("#shape-shadow-blur").val(e.shadow.blur), s.find("#shape-shadow-offset-x").val(e.shadow.offsetX), s.find("#shape-shadow-offset-y").val(e.shadow.offsetY));
                    s.find("#palleon-shape-shadow").trigger("change"), null == e.strokeDashArray ? s.find("#palleon-shape-dashed-outline").prop("checked", !1) : Array.isArray(e.strokeDashArray) && (s.find("#palleon-shape-dashed-outline").prop("checked", !0), s.find("#shape-dashed-outline-width").val(e.strokeDashArray[0]), s.find("#shape-dashed-outline-spacing").val(e.strokeDashArray[1]));
                    s.find("#palleon-shape-dashed-outline").trigger("change"), s.find("#shape-opacity").val(e.opacity), s.find("#shape-opacity").parent().parent().find(".slider-label span").html(e.opacity), s.find("#shape-skew-x").val(e.skewX), s.find("#shape-skew-x").parent().parent().find(".slider-label span").html(e.skewX), s.find("#shape-skew-y").val(e.skewX), s.find("#shape-skew-y").parent().parent().find(".slider-label span").html(e.skewY), s.find("#shape-rotate").val(parseInt(e.angle)), s.find("#shape-rotate").parent().parent().find(".slider-label span").html(parseInt(e.angle)), "square" == e.objectType || "rectangle" == e.objectType ? s.find("#palleon-shape-rounded-corners").show() : s.find("#palleon-shape-rounded-corners").hide();
                    void 0 !== e.rx ? (s.find("#shape-rounded-corners").val(parseInt(e.rx)), s.find("#shape-rounded-corners").parent().parent().find(".slider-label span").html(parseInt(e.rx))) : (s.find("#shape-rounded-corners").val(0), s.find("#shape-rounded-corners").parent().parent().find(".slider-label span").html(0));
                    "printarea" == e.objectType ? (s.find("#shape-custom-width").val(e.width), s.find("#shape-custom-height").val(e.height)) : (s.find("#shape-custom-width").val(""), s.find("#shape-custom-height").val(""))
                }(a), s.find("#palleon-btn-shapes").hasClass("active") || s.find("#palleon-btn-shapes").trigger("click"), s.find("#palleon-shape-setting-open").trigger("click")) : s.find("#palleon-shape-settings").hide(), a.id && s.find("#palleon-layers #" + a.id).addClass("active")) : e.each(a, function(e, a) {
                    s.find("#palleon-layers #" + a.id).addClass("active")
                })
        }

        function ve() {
            fabric.Image.fromURL(u, function(e) {
                j.setBackgroundImage(e, j.renderAll.bind(j), {
                    objectType: "BG",
                    mode: m,
                    top: 0,
                    left: 0,
                    scaleX: w,
                    scaleY: k,
                    selectable: !1,
                    angle: y,
                    originX: x,
                    originY: P,
                    lockMovementX: !0,
                    lockMovementY: !0,
                    lockRotation: !0,
                    erasable: !0
                }, {
                    crossOrigin: "anonymous"
                })
            })
        }

        function ye(e) {
            var a = v,
                t = b;
            if (0 != y && 180 != y && -180 != y || (a = b, t = v), e) e /= 100, j.setZoom(e);
            else {
                var n = s.find("#palleon-img-zoom").val(),
                    l = 1,
                    i = 0;
                a < s.find("#palleon-content").width() && t < s.find("#palleon-content").height() ? (j.setZoom(1), s.find("#palleon-img-zoom").val(100)) : (a > s.find("#palleon-content").width() && n > 100 * (l = (s.find("#palleon-content").width() - 60) / a).toFixed(2) && (j.setZoom(l.toFixed(2)), s.find("#palleon-img-zoom").val(100 * l.toFixed(2)), i = l.toFixed(2)), t > s.find("#palleon-content").height() && n > 100 * (l = s.find("#palleon-content").height() / t).toFixed(2) && (0 === i || i > l.toFixed(2)) && (j.setZoom(l.toFixed(2)), s.find("#palleon-img-zoom").val(100 * l.toFixed(2))))
            }
            j.setWidth(a * j.getZoom()), j.setHeight(t * j.getZoom()), !0 === j.isDrawingMode && (s.find("#palleon-erase-btn").hasClass("active") && s.find("#eraser-width").trigger("input"), s.find("#palleon-draw-btn").hasClass("active") && s.find("#brush-width").trigger("input"))
        }
        s.find("#palleon-layer-delete").on("click", function() {
            if (window.confirm(palleonParams.answer4)) {
                var e = s.find("#palleon-layer-select").val(),
                    a = j.getObjects();
                "all" == e ? (a.filter(e => "printarea" != e.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers > li:not(.layer-printarea)").remove()) : (a.filter(a => a.objectType == e && "printarea" != a.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers > li.layer-" + e).remove()), j.requestRenderAll(), s.find("#palleon-layers").sortable("refresh"), ue()
            }
        }), s.find("#palleon-img-drag").on("click", function() {
            e(this).hasClass("active") ? (e(this).removeClass("active"), s.find("#palleon-canvas-overlay").hide(), s.find("#palleon-canvas-wrap").draggable("disable")) : (e(this).addClass("active"), s.find("#palleon-canvas-overlay").show(), s.find("#palleon-canvas-wrap").draggable("enable"))
        }), s.find(".palleon-counter input.palleon-form-field").on("input", function() {
            ye(parseInt(e(this).val()))
        });
        var we = function(e) {
            s.find("#palleon-resize-width").val(Math.round(e.width)), s.find("#palleon-resize-height").val(Math.round(e.height)), s.find("#palleon-img-width").html(Math.round(e.width)), s.find("#palleon-img-height").html(Math.round(e.height)), s.find("#palleon-crop-width").val(Math.round(e.width / 2)), s.find("#palleon-crop-height").val(Math.round(e.height / 2)), s.find("#palleon-resize-width").data("size", Math.round(e.width)), s.find("#palleon-resize-height").data("size", Math.round(e.height)), "image" == m && (s.find("#palleon-crop-width").data("max", Math.round(e.width)), s.find("#palleon-crop-height").data("max", Math.round(e.height))), s.find("#palleon-resize-width").trigger("sizeChanged"), s.find("#palleon-resize-height").trigger("sizeChanged")
        };

        function ke() {
            var e = j.getObjects();
            e.filter(e => "BG" != e.objectType).forEach(e => e.set("visible", !1)), j.backgroundColor = "transparent";
            var a = H(j.toDataURL({
                format: "png",
                enableRetinaScaling: !1
            }));
            u = URL.createObjectURL(a), s.find("#palleon-canvas-img").attr("src", u), j.backgroundColor = s.find("#custom-image-background").val(), e.filter(e => "BG" != e.objectType).forEach(e => e.set("visible", !0))
        }

        function xe() {
            var e = j.getObjects();
            I.moveTo(9999), j.setActiveObject(I), s.find("#palleon-crop-btns").removeClass("disabled"), s.find("ul.palleon-accordion > li, #palleon-icon-menu, #palleon-top-bar, #palleon-right-col, .palleon-content-bar").css("pointer-events", "none"), s.find("ul.palleon-accordion > li.accordion-crop").css("pointer-events", "auto"), e.filter(e => "clipPath" != e.objectType && "BG" != e.objectType).forEach(e => e.set("selectable", !1))
        }

        function Pe(e) {
            if (!g) {
                g = !0, n = e, j.uniformScaling = !1, n.setCoords();
                var a = n.get("left") - n.get("width") * n.get("scaleX") / 2,
                    t = n.get("top") - n.get("height") * n.get("scaleY") / 2,
                    s = n.get("cropX"),
                    d = n.get("cropY");
                j.add(new fabric.Rect({
                    objectType: "clipPath",
                    left: 0,
                    top: 0,
                    originX: "left",
                    originY: "top",
                    width: b,
                    height: v,
                    fill: "rgba(0,0,0,0.5)",
                    selectable: !1,
                    lockMovementX: !0,
                    lockMovementY: !0,
                    lockRotation: !0,
                    id: "overlay"
                }));
                var c = new fabric.Rect({
                    objectType: "clipPath",
                    left: e.get("left"),
                    top: e.get("top"),
                    width: e.get("width") * e.get("scaleX") - 5,
                    height: e.get("height") * e.get("scaleY") - 5,
                    originX: "center",
                    originY: "center",
                    id: "crop",
                    fill: "rgba(0,0,0,0)",
                    shadow: {
                        color: "black",
                        offsetX: 0,
                        offsetY: 0,
                        blur: 0,
                        opacity: 0
                    }
                });
                n.clone(function(a) {
                    a.set({
                        objectType: "clipPath",
                        id: "cropped",
                        selectable: !1,
                        originX: "center",
                        originY: "center"
                    }), j.add(a), j.bringToFront(a), j.bringToFront(c), j.requestRenderAll(), n = e
                }), n.set({
                    cropX: 0,
                    cropY: 0,
                    width: n.get("ogWidth"),
                    height: n.get("ogHeight")
                }).setCoords(), j.requestRenderAll(), n.set({
                    left: a + n.get("width") * n.get("scaleX") / 2 - s * n.get("scaleX"),
                    top: t + n.get("height") * n.get("scaleY") / 2 - d * n.get("scaleY")
                }), c.setControlsVisibility({
                    mt: !1,
                    mb: !1,
                    mr: !1,
                    ml: !1,
                    mtr: !1,
                    deleteControl: !1,
                    cloneControl: !1
                }), c.controls.tl = new fabric.Control({
                    x: -.5,
                    y: -.5,
                    offsetX: 3,
                    offsetY: 3,
                    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                    actionHandler: fabric.controlsUtils.scalingEqually,
                    render: function(e, a, t, n, l) {
                        e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(Ce, -13.5, -13.5, 27, 27), e.restore()
                    }
                }), c.controls.tr = new fabric.Control({
                    x: .5,
                    y: -.5,
                    offsetX: -3,
                    offsetY: 3,
                    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                    actionHandler: fabric.controlsUtils.scalingEqually,
                    render: function(e, a, t, n, l) {
                        e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(Ie, -13.5, -13.5, 27, 27), e.restore()
                    }
                }), c.controls.bl = new fabric.Control({
                    x: -.5,
                    y: .5,
                    offsetX: 3,
                    offsetY: -3,
                    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                    actionHandler: fabric.controlsUtils.scalingEqually,
                    render: function(e, a, t, n, l) {
                        e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(Se, -13.5, -13.5, 27, 27), e.restore()
                    }
                }), c.controls.br = new fabric.Control({
                    x: .5,
                    y: .5,
                    offsetX: -3,
                    offsetY: -3,
                    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                    actionHandler: fabric.controlsUtils.scalingEqually,
                    render: function(e, a, t, n, l) {
                        e.save(), e.translate(a, t), e.rotate(fabric.util.degreesToRadians(l.angle)), e.drawImage(Te, -13.5, -13.5, 27, 27), e.restore()
                    }
                }), j.add(c), j.setActiveObject(c), j.requestRenderAll(), r = c.get("left"), o = c.get("top"), l = c.get("scaleX") - .03, i = c.get("scaleY") - .03
            }
        }

        function je(e) {
            var a = j.getItemById("crop");
            n.setCoords(), a.setCoords();
            var t = a.get("left") - a.get("width") * a.get("scaleX") / 2,
                l = a.get("top") - a.get("height") * a.get("scaleY") / 2,
                i = a.get("height") / n.get("scaleY") * a.get("scaleY"),
                o = a.get("width") / n.get("scaleX") * a.get("scaleX"),
                r = (n.get("height"), n.get("scaleY"), n.get("width"), n.get("scaleX"), t - (n.get("left") - n.get("width") * n.get("scaleX") / 2)),
                s = l - (n.get("top") - n.get("height") * n.get("scaleY") / 2);
            r < 0 && s > 0 ? (e.set({
                cropY: s / n.get("scaleY"),
                height: i
            }).setCoords(), j.requestRenderAll(), e.set({
                top: l + e.get("height") * e.get("scaleY") / 2
            }), j.requestRenderAll()) : s < 0 && r > 0 ? (e.set({
                cropX: r / n.get("scaleX"),
                width: o
            }).setCoords(), j.requestRenderAll(), e.set({
                left: t + e.get("width") * e.get("scaleX") / 2
            }), j.requestRenderAll()) : s > 0 && r > 0 && (e.set({
                cropX: r / n.get("scaleX"),
                cropY: s / n.get("scaleY"),
                height: i,
                width: o
            }).setCoords(), j.requestRenderAll(), e.set({
                left: t + e.get("width") * e.get("scaleX") / 2,
                top: l + e.get("height") * e.get("scaleY") / 2
            }), j.requestRenderAll()), "cropped" != e.get("id") && (j.remove(a), j.remove(j.getItemById("overlay")), j.remove(j.getItemById("cropped")), g = !1, fabric.Object.prototype.controls.ml = new fabric.Control({
                x: -.5,
                y: 0,
                offsetX: -1,
                cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
                getActionName: fabric.controlsUtils.scaleOrSkewActionName
            }), fabric.Object.prototype.controls.mr = new fabric.Control({
                x: .5,
                y: 0,
                offsetX: 1,
                cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
                getActionName: fabric.controlsUtils.scaleOrSkewActionName
            }), fabric.Object.prototype.controls.mb = new fabric.Control({
                x: 0,
                y: .5,
                offsetY: 1,
                cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
                getActionName: fabric.controlsUtils.scaleOrSkewActionName
            }), fabric.Object.prototype.controls.mt = new fabric.Control({
                x: 0,
                y: -.5,
                offsetY: -1,
                cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
                getActionName: fabric.controlsUtils.scaleOrSkewActionName
            }), fabric.Object.prototype.controls.tl = new fabric.Control({
                x: -.5,
                y: -.5,
                cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingEqually
            }), fabric.Object.prototype.controls.tr = new fabric.Control({
                x: .5,
                y: -.5,
                cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingEqually
            }), fabric.Object.prototype.controls.bl = new fabric.Control({
                x: -.5,
                y: .5,
                cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingEqually
            }), fabric.Object.prototype.controls.br = new fabric.Control({
                x: .5,
                y: .5,
                cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
                actionHandler: fabric.controlsUtils.scalingEqually
            }), j.uniformScaling = !0, j.requestRenderAll(), j.fire("palleon:history", {
                type: "image",
                text: palleonParams.edited
            })), j.requestRenderAll()
        }
        s.find("#palleon-crop-style").on("change", function() {
            if ("" != e(this).val() && e(this).select2("enable", !1), "freeform" == e(this).val())(I = new fabric.Rect({
                fill: "rgba(156, 39, 176, 0.3)",
                width: b / 2,
                height: v / 2,
                excludeFromExport: !0,
                objectType: "clipPath",
                top: Re()[1] / 4,
                left: Re()[0] / 4
            })).controls = {
                ...fabric.Rect.prototype.controls,
                mtr: new fabric.Control({
                    visible: !1
                })
            }, j.add(I), xe();
            else if ("custom" == e(this).val()) {
                s.find(".crop-custom").css("display", "flex");
                var a = parseInt(s.find("#palleon-crop-width").val()),
                    t = parseInt(s.find("#palleon-crop-height").val());
                (I = new fabric.Rect({
                    fill: "rgba(156, 39, 176, 0.3)",
                    width: a,
                    height: t,
                    excludeFromExport: !0,
                    objectType: "clipPath",
                    top: Re()[1] / 4,
                    left: Re()[0] / 4
                })).controls = {
                    ...fabric.Rect.prototype.controls,
                    mtr: new fabric.Control({
                        visible: !1
                    }),
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    }),
                    tl: new fabric.Control({
                        visible: !1
                    }),
                    bl: new fabric.Control({
                        visible: !1
                    }),
                    tr: new fabric.Control({
                        visible: !1
                    }),
                    br: new fabric.Control({
                        visible: !1
                    })
                }, j.add(I), xe()
            } else if ("square" == e(this).val()) {
                var n = v / 2,
                    l = Re()[1] / 4;
                b > v && (n = b / 2, l = Re()[1] / 8), (I = new fabric.Rect({
                    fill: "rgba(156, 39, 176, 0.3)",
                    width: n,
                    height: n,
                    excludeFromExport: !0,
                    objectType: "clipPath",
                    top: l,
                    left: Re()[0] / 4
                })).controls = {
                    ...fabric.Rect.prototype.controls,
                    mtr: new fabric.Control({
                        visible: !1
                    }),
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    })
                }, j.add(I), xe()
            } else if ("original" == e(this).val())(I = new fabric.Rect({
                fill: "rgba(156, 39, 176, 0.3)",
                width: b / 2,
                height: v / 2,
                excludeFromExport: !0,
                objectType: "clipPath",
                top: Re()[1] / 4,
                left: Re()[0] / 4
            })).controls = {
                ...fabric.Rect.prototype.controls,
                mtr: new fabric.Control({
                    visible: !1
                }),
                ml: new fabric.Control({
                    visible: !1
                }),
                mb: new fabric.Control({
                    visible: !1
                }),
                mr: new fabric.Control({
                    visible: !1
                }),
                mt: new fabric.Control({
                    visible: !1
                })
            }, j.add(I), xe();
            else {
                j.getObjects().filter(e => "clipPath" != e.objectType && "BG" != e.objectType).forEach(e => e.set("selectable", !0)), s.find(".crop-custom").css("display", "none"), s.find("#palleon-crop-btns").addClass("disabled"), s.find("ul.palleon-accordion > li, #palleon-icon-menu, #palleon-top-bar, #palleon-right-col, .palleon-content-bar").css("pointer-events", "auto")
            }
        }), s.find("#palleon-crop-cancel").on("click", function() {
            s.find("#palleon-crop-btns").addClass("disabled"), s.find("#palleon-crop-style").select2("enable"), s.find("#palleon-crop-style").val(""), s.find("#palleon-crop-style").trigger("change"), j.remove(""), j.remove(I)
        }), s.find("#palleon-crop-apply").on("click", function() {
            s.find("#palleon-crop-btns").addClass("disabled"), s.find("#palleon-crop-style").select2("enable"), s.find("#palleon-crop-style").val(""), s.find("#palleon-crop-style").trigger("change"), j.setZoom(1), s.find("#palleon-img-zoom").val(100);
            var e = I.getBoundingRect();
            j.setWidth(e.width - 1), j.setHeight(e.height - 1), j.backgroundImage.set({
                top: -e.top,
                left: -e.left
            }), j.remove(""), j.remove(I), ke(), s.find("#palleon-canvas-img-wrap").imagesLoaded(function() {
                b = j.width, v = j.height, y = 0, x = "left", P = "top", w = 1, k = 1, ve(), we(j), ye(), j.requestRenderAll(), setTimeout(function() {
                    j.fire("palleon:history", {
                        type: "BG",
                        text: palleonParams.cropped
                    })
                }, 500)
            })
        }), s.find("#palleon-crop-width").bind("input paste", function() {
            if (s.find("#palleon-crop-lock").hasClass("active")) {
                var a = e(this).data("max") / s.find("#palleon-crop-height").data("max");
                s.find("#palleon-crop-height").val(Math.round(this.value / a))
            }
            I.set("width", parseInt(e(this).val())), I.set("height", parseInt(s.find("#palleon-crop-height").val())), j.requestRenderAll()
        }), s.find("#palleon-crop-height").bind("input paste", function() {
            if (s.find("#palleon-crop-lock").hasClass("active")) {
                var a = e(this).data("max") / s.find("#palleon-crop-width").data("max");
                s.find("#palleon-crop-width").val(Math.round(this.value / a))
            }
            I.set("height", parseInt(e(this).val())), I.set("width", parseInt(s.find("#palleon-crop-width").val())), j.requestRenderAll()
        }), s.on("click", "#crop-image-object", function() {
            j.getActiveObject() && (s.find("#palleon-icon-menu, #palleon-top-bar, #palleon-right-col, #palleon-img-upload-wrap, #palleon-img-media-library, #palleon-image-settings > *, .palleon-content-bar, #agama-print-areas").css("pointer-events", "none"), s.find("#crop-image-object-selection").css("pointer-events", "auto"), e(this).addClass("d-none"), s.find("#crop-image-object-selection").removeClass("d-none"), Pe(j.getActiveObject()))
        }), s.on("click", "#crop-image-object-selection", function() {
            g && (s.find("#palleon-icon-menu, #palleon-top-bar, #palleon-right-col, #palleon-img-upload-wrap, #palleon-img-media-library, #palleon-image-settings > *, .palleon-content-bar, #agama-print-areas").css("pointer-events", "auto"), e(this).addClass("d-none"), s.find("#crop-image-object").removeClass("d-none"), j.discardActiveObject(), j.fire("selection:cleared"), j.requestRenderAll())
        });
        var Ce = new Image;
        Ce.src = palleonParams.baseURL + "assets/tlcrop.svg";
        var Ie = new Image;
        Ie.src = palleonParams.baseURL + "assets/trcrop.svg";
        var Se = new Image;
        Se.src = palleonParams.baseURL + "assets/blcrop.svg";
        var Te = new Image;

        function Ae(e) {
            0 == y || 180 == y || -180 == y ? (j.setDimensions({
                width: v,
                height: b
            }), w = j.height / h.width, k = j.width / h.height) : (j.setDimensions({
                width: b,
                height: v
            }), w = j.width / h.width, k = j.height / h.height), "right" == e ? 0 == y ? (y = 90, x = "left", P = "bottom") : 90 == y ? (y = 180, x = "right", P = "bottom") : 180 == y ? (y = 270, x = "right", P = "top") : 270 == y ? (y = 0, x = "left", P = "top") : -90 == y ? (y = 0, x = "left", P = "top") : -180 == y ? (y = -90, x = "right", P = "top") : -270 == y && (y = -180, x = "right", P = "bottom") : "left" == e && (0 == y ? (y = -90, x = "right", P = "top") : -90 == y ? (y = -180, x = "right", P = "bottom") : -180 == y ? (y = -270, x = "left", P = "bottom") : -270 == y ? (y = 0, x = "left", P = "top") : 90 == y ? (y = 0, x = "left", P = "top") : 180 == y ? (y = 90, x = "left", P = "bottom") : 270 == y && (y = 180, x = "right", P = "bottom")), j.backgroundImage.set({
                scaleX: w,
                scaleY: k,
                angle: y,
                originX: x,
                originY: P
            });
            var a = new fabric.Rect({
                radius: 50,
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0,
                objectType: "clipPath",
                width: j.height,
                height: j.width,
                gradientFill: "none",
                top: 0,
                left: 0,
                originX: "left",
                originY: "top"
            });
            j.add(a), j.discardActiveObject();
            var t = new fabric.ActiveSelection(j.getObjects(), {
                canvas: j
            });
            j.setActiveObject(t);
            var n = j.getActiveObject();
            "right" == e ? n.set({
                angle: 90,
                originX: "left",
                originY: "bottom"
            }) : "left" == e && n.set({
                angle: -90,
                originX: "right",
                originY: "top"
            }), j.remove(a), j.discardActiveObject(), we(j), ye(), j.requestRenderAll(), j.fire("palleon:history", {
                type: "BG",
                text: palleonParams.rotated
            })
        }
        Te.src = palleonParams.baseURL + "assets/brcrop.svg", s.find("#palleon-resize-apply").on("click", function() {
            ! function() {
                var e = parseInt(s.find("#palleon-resize-width").val()),
                    a = parseInt(s.find("#palleon-resize-height").val());
                
                // Store current background image scale before resizing
                var bgImg = j.backgroundImage;
                var currentScaleX = 1, currentScaleY = 1;
                if (bgImg) {
                    currentScaleX = bgImg.scaleX || 1;
                    currentScaleY = bgImg.scaleY || 1;
                }
                
                // Update global variables and canvas dimensions
                b = e, v = a, j.setZoom(1), s.find("#palleon-img-zoom").val(100), j.setWidth(e), j.setHeight(a);
                
                // Keep background image at its current scale - DO NOT resize it
                if (bgImg) {
                    // Preserve the exact current scale, don't let it change
                    bgImg.set({
                        scaleX: currentScaleX,
                        scaleY: currentScaleY
                    });
                    
                    // Keep background image centered or at its current position
                    // Don't automatically center - this could move content
                    // Just leave it where it is - content outside will be clipped
                }
                
                // Don't scale or move existing objects - just keep them in their current positions
                // Objects outside the new canvas bounds will be clipped automatically
                j.discardActiveObject();
                
                ke(), s.find("#palleon-canvas-img-wrap").imagesLoaded(function() {
                    j.discardActiveObject(), b = j.width, v = j.height, y = 0, x = "left", P = "top", w = 1, k = 1, ve(), we(j), ye(), j.requestRenderAll(), setTimeout(function() {
                        j.fire("palleon:history", {
                            type: "BG",
                            text: palleonParams.resized
                        })
                    }, 500)
                })
            }()
        }), s.find("#palleon-resize-width").bind("input paste", function() {
            if (s.find("#palleon-resize-lock").hasClass("active")) {
                var a = e(this).data("size") / s.find("#palleon-resize-height").data("size");
                s.find("#palleon-resize-height").val(Math.round(this.value / a))
            }
        }), s.find("#palleon-resize-height").bind("input paste", function() {
            if (s.find("#palleon-resize-lock").hasClass("active")) {
                var a = e(this).data("size") / s.find("#palleon-resize-width").data("size");
                s.find("#palleon-resize-width").val(Math.round(this.value / a))
            }
        }), s.find("#palleon-rotate-right").on("click", function() {
            Ae("right")
        }), s.find("#palleon-rotate-left").on("click", function() {
            Ae("left")
        }), s.find("#palleon-flip-horizontal").on("click", function() {
            j.backgroundImage.toggle("flipX");
            var e = new fabric.Rect({
                radius: 50,
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0,
                objectType: "clipPath",
                width: Re()[0],
                height: Re()[1],
                gradientFill: "none",
                top: 0,
                left: 0,
                originX: "left",
                originY: "top"
            });
            j.add(e), j.discardActiveObject();
            var a = new fabric.ActiveSelection(j.getObjects(), {
                canvas: j
            });
            j.setActiveObject(a);
            var t = j.getActiveObject();
            0 == y || 180 == y || -180 == y ? t.toggle("flipX") : t.toggle("flipY"), j.remove(e), j.discardActiveObject(), j.requestRenderAll(), j.fire("palleon:history", {
                type: "BG",
                text: palleonParams.flipped
            })
        }), s.find("#palleon-flip-vertical").on("click", function() {
            j.backgroundImage.toggle("flipY");
            var e = new fabric.Rect({
                radius: 50,
                fill: "transparent",
                stroke: "transparent",
                strokeWidth: 0,
                objectType: "clipPath",
                width: Re()[0],
                height: Re()[1],
                gradientFill: "none",
                top: 0,
                left: 0,
                originX: "left",
                originY: "top"
            });
            j.add(e), j.discardActiveObject();
            var a = new fabric.ActiveSelection(j.getObjects(), {
                canvas: j
            });
            j.setActiveObject(a);
            var t = j.getActiveObject();
            0 == y || 180 == y || -180 == y ? t.toggle("flipY") : t.toggle("flipX"), j.remove(e), j.discardActiveObject(), j.requestRenderAll(), j.fire("palleon:history", {
                type: "BG",
                text: palleonParams.flipped
            })
        }), s.find("#palleon-brightness").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Brightness) : (s.find("#brightness").val(0), s.find("#brightness").parent().parent().find(".slider-label span").html(0), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Brightness" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#brightness").on("input", function() {
            j.backgroundImage.filters.filter(e => "Brightness" == e.type).forEach(e => e.brightness = parseFloat(this.value)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#brightness").on("change", function(e) {
            e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-contrast").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Contrast) : (s.find("#contrast").val(0), s.find("#contrast").parent().parent().find(".slider-label span").html(0), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Contrast" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#contrast").on("input", function() {
            j.backgroundImage.filters.filter(e => "Contrast" == e.type).forEach(e => e.contrast = parseFloat(this.value)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#contrast").on("change", function(e) {
            e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-saturation").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Saturation) : (s.find("#saturation").val(0), s.find("#saturation").parent().parent().find(".slider-label span").html(0), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Saturation" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#saturation").on("input", function() {
            j.backgroundImage.filters.filter(e => "Saturation" == e.type).forEach(e => e.saturation = parseFloat(this.value)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#saturation").on("change", function(e) {
            e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-hue").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.HueRotation) : (s.find("#hue").val(0), s.find("#hue").parent().parent().find(".slider-label span").html(0), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "HueRotation" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#hue").on("input", function() {
            j.backgroundImage.filters.filter(e => "HueRotation" == e.type).forEach(e => e.rotation = parseFloat(this.value)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#hue").on("change", function(e) {
            e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-img-mask").on("change", function(a) {
            var t = e(this).find(":selected").val();
            "custom" == t ? s.find("#palleon-img-radius-settings").removeClass("d-none") : (s.find("#palleon-img-radius-settings").addClass("d-none"), s.find("#img-border-radius").val("0"), s.find("#img-border-radius").parent().parent().find("label span").html("0"));
            var n = j.getActiveObject(),
                l = null,
                i = -n.width / 2,
                o = -n.width / 2,
                r = n.width / 2;
            if (n.width > n.height && (i = -n.height / 2, o = -n.height / 2, r = n.height / 2), n.clipPath = null, j.requestRenderAll(), "circle" == t) l = new fabric.Circle({
                maskType: t,
                radius: r,
                left: i,
                top: o
            });
            else if ("triangle" == t) l = new fabric.Triangle({
                maskType: t,
                width: 2 * r,
                height: 2 * r,
                left: i,
                top: o
            });
            else if ("triangleDown" == t) l = new fabric.Triangle({
                maskType: t,
                width: 2 * r,
                height: 2 * r,
                flipY: !0,
                left: i,
                top: o
            });
            else if ("triangleRight" == t) l = new fabric.Triangle({
                maskType: t,
                width: 2 * r,
                height: 2 * r,
                left: i,
                top: o,
                originX: "left",
                originY: "bottom",
                angle: 90
            });
            else if ("triangleLeft" == t) l = new fabric.Triangle({
                maskType: t,
                width: 2 * r,
                height: 2 * r,
                left: i,
                top: o,
                originX: "right",
                originY: "top",
                angle: -90
            });
            else if ("pentagon" == t) {
                var d = [{
                    x: 26,
                    y: 86
                }, {
                    x: 11.2,
                    y: 40.4
                }, {
                    x: 50,
                    y: 12.2
                }, {
                    x: 88.8,
                    y: 40.4
                }, {
                    x: 74,
                    y: 86
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            } else if ("pentagonDown" == t) {
                d = [{
                    x: 26,
                    y: 86
                }, {
                    x: 11.2,
                    y: 40.4
                }, {
                    x: 50,
                    y: 12.2
                }, {
                    x: 88.8,
                    y: 40.4
                }, {
                    x: 74,
                    y: 86
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    flipY: !0,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            } else if ("pentagonLeft" == t) {
                d = [{
                    x: 26,
                    y: 86
                }, {
                    x: 11.2,
                    y: 40.4
                }, {
                    x: 50,
                    y: 12.2
                }, {
                    x: 88.8,
                    y: 40.4
                }, {
                    x: 74,
                    y: 86
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    originX: "right",
                    originY: "top",
                    angle: -90,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            } else if ("pentagonRight" == t) {
                d = [{
                    x: 26,
                    y: 86
                }, {
                    x: 11.2,
                    y: 40.4
                }, {
                    x: 50,
                    y: 12.2
                }, {
                    x: 88.8,
                    y: 40.4
                }, {
                    x: 74,
                    y: 86
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    originX: "left",
                    originY: "bottom",
                    angle: 90,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            } else if ("octagon" == t) {
                d = [{
                    x: 34.2,
                    y: 87.4
                }, {
                    x: 12.3,
                    y: 65.5
                }, {
                    x: 12.3,
                    y: 34.5
                }, {
                    x: 34.2,
                    y: 12.6
                }, {
                    x: 65.2,
                    y: 12.6
                }, {
                    x: 87.1,
                    y: 34.5
                }, {
                    x: 87.1,
                    y: 65.5
                }, {
                    x: 65.2,
                    y: 87.4
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            } else if ("star" == t) {
                d = [{
                    x: 350,
                    y: 75
                }, {
                    x: 380,
                    y: 160
                }, {
                    x: 470,
                    y: 160
                }, {
                    x: 400,
                    y: 215
                }, {
                    x: 423,
                    y: 301
                }, {
                    x: 350,
                    y: 250
                }, {
                    x: 277,
                    y: 301
                }, {
                    x: 303,
                    y: 215
                }, {
                    x: 231,
                    y: 161
                }, {
                    x: 321,
                    y: 161
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            } else if ("starReverse" == t) {
                d = [{
                    x: 350,
                    y: 75
                }, {
                    x: 380,
                    y: 160
                }, {
                    x: 470,
                    y: 160
                }, {
                    x: 400,
                    y: 215
                }, {
                    x: 423,
                    y: 301
                }, {
                    x: 350,
                    y: 250
                }, {
                    x: 277,
                    y: 301
                }, {
                    x: 303,
                    y: 215
                }, {
                    x: 231,
                    y: 161
                }, {
                    x: 321,
                    y: 161
                }];
                (l = new fabric.Polygon(d, {
                    maskType: t,
                    width: 2 * r,
                    height: 2 * r,
                    flipY: !0,
                    left: i,
                    top: o
                })).scaleToWidth(n.width), n.width > n.height && l.scaleToHeight(n.height)
            }
            setTimeout(function() {
                n.clipPath = l, j.requestRenderAll(), ge(fe("image") + " " + palleonParams.mask + " " + palleonParams.added)
            }, 100)
        }), s.find("#image-filter").on("change", function(a) {
            var t = e(this).find(":selected").val(),
                n = j.getActiveObject();
            "grayscale" == t ? n.filters[0] = new fabric.Image.filters.Grayscale : "sepia" == t ? n.filters[0] = new fabric.Image.filters.Sepia : "blackwhite" == t ? n.filters[0] = new fabric.Image.filters.BlackWhite : "brownie" == t ? n.filters[0] = new fabric.Image.filters.Brownie : "vintage" == t ? n.filters[0] = new fabric.Image.filters.Vintage : "kodachrome" == t ? n.filters[0] = new fabric.Image.filters.Kodachrome : "technicolor" == t ? n.filters[0] = new fabric.Image.filters.Technicolor : "polaroid" == t ? n.filters[0] = new fabric.Image.filters.Polaroid : "shift" == t ? n.filters[0] = new fabric.Image.filters.Shift : "invert" == t ? n.filters[0] = new fabric.Image.filters.Invert : n.filters = [], n.applyFilters(), j.requestRenderAll()
        }), s.find("#palleon-filters input[type=checkbox]").on("change", function(a) {
            e(this).is(":checked") ? "grayscale" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Grayscale) : "sepia" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Sepia) : "blackwhite" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.BlackWhite) : "brownie" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Brownie) : "vintage" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Vintage) : "kodachrome" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Kodachrome) : "technicolor" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Technicolor) : "polaroid" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Polaroid) : "shift" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Shift) : "invert" == e(this).attr("id") ? j.backgroundImage.filters.push(new fabric.Image.filters.Invert) : "sharpen" == e(this).attr("id") ? (s.find("#emboss").prop("checked", !1), s.find("#sobelX").prop("checked", !1), s.find("#sobelY").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type), j.backgroundImage.filters.push(new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
            }))) : "emboss" == e(this).attr("id") ? (s.find("#sharpen").prop("checked", !1), s.find("#sobelX").prop("checked", !1), s.find("#sobelY").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type), j.backgroundImage.filters.push(new fabric.Image.filters.Convolute({
                opaque: !0,
                matrix: [1, 1, 1, 1, .7, -1, -1, -1, -1]
            }))) : "sobelX" == e(this).attr("id") ? (s.find("#emboss").prop("checked", !1), s.find("#sharpen").prop("checked", !1), s.find("#sobelY").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type), j.backgroundImage.filters.push(new fabric.Image.filters.Convolute({
                opaque: !0,
                matrix: [-1, 0, 1, -2, 0, 2, -1, 0, 1]
            }))) : "sobelY" == e(this).attr("id") && (s.find("#emboss").prop("checked", !1), s.find("#sharpen").prop("checked", !1), s.find("#sobelX").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type), j.backgroundImage.filters.push(new fabric.Image.filters.Convolute({
                opaque: !0,
                matrix: [-1, -2, -1, 0, 0, 0, 1, 2, 1]
            }))) : "grayscale" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Grayscale" != e.type) : "sepia" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Sepia" != e.type) : "blackwhite" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "BlackWhite" != e.type) : "brownie" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Brownie" != e.type) : "vintage" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Vintage" != e.type) : "kodachrome" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Kodachrome" != e.type) : "technicolor" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Technicolor" != e.type) : "polaroid" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Polaroid" != e.type) : "shift" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Shift" != e.type) : "invert" == e(this).attr("id") ? j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Invert" != e.type) : "sharpen" == e(this).attr("id") ? (s.find("#emboss").prop("checked", !1), s.find("#sobelX").prop("checked", !1), s.find("#sobelY").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type)) : "emboss" == e(this).attr("id") ? (s.find("#sharpen").prop("checked", !1), s.find("#sobelX").prop("checked", !1), s.find("#sobelY").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type)) : "sobelX" == e(this).attr("id") ? (s.find("#emboss").prop("checked", !1), s.find("#sharpen").prop("checked", !1), s.find("#sobelY").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type)) : "sobelY" == e(this).attr("id") && (s.find("#emboss").prop("checked", !1), s.find("#sharpen").prop("checked", !1), s.find("#sobelX").prop("checked", !1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Convolute" != e.type)), j.backgroundImage.applyFilters(), j.requestRenderAll(), a.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-filter-library").imagesLoaded(function() {
            s.find("#palleon-filter-library > .grid-item").not(".none").each(function() {
                var a = e(this),
                    t = a.find("img")[0];
                pixelsJS.filterImg(t, a.data("filter"))
            })
        }), s.find("#palleon-filter-library > .grid-item").on("click", function() {
            var a = e(this),
                t = s.find("#palleon-pages").find("div.active").attr("data-origin");
            s.find("#palleon-filter-preview").html('<img src="' + t + '">');
            var n = "",
                l = s.find("#palleon-filter-preview img")[0];
            "" != a.data("filter") ? (pixelsJS.filterImg(l, a.data("filter")), n = s.find("#palleon-filter-preview > canvas")[0].toDataURL()) : n = t, e(document).trigger("loadBase64Img", [n, s.find("#palleon-download-name").val(), !1])
        }), s.find("#palleon-gamma").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Gamma) : (s.find("#gamma-red").val(1), s.find("#gamma-red").parent().parent().find(".slider-label span").html(1), s.find("#gamma-green").val(1), s.find("#gamma-green").parent().parent().find(".slider-label span").html(1), s.find("#gamma-blue").val(1), s.find("#gamma-blue").parent().parent().find(".slider-label span").html(1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Gamma" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#palleon-gamma-settings input").on("input", function() {
            var a = [parseFloat(e("#gamma-red").val()), parseFloat(e("#gamma-green").val()), parseFloat(e("#gamma-blue").val())];
            j.backgroundImage.filters.filter(e => "Gamma" == e.type).forEach(e => e.gamma = a), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#palleon-gamma-settings input").on("change", function(e) {
            e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-blur").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Blur) : (s.find("#blur").val(0), s.find("#blur").parent().parent().find(".slider-label span").html(0), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Blur" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#blur").on("change", function(e) {
            j.backgroundImage.filters.filter(e => "Blur" == e.type).forEach(e => e.blur = parseFloat(this.value)), j.backgroundImage.applyFilters(), j.requestRenderAll(), e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-noise").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Noise) : (s.find("#noise").val(0), s.find("#noise").parent().parent().find(".slider-label span").html(0), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Noise" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#noise").on("input", function() {
            j.backgroundImage.filters.filter(e => "Noise" == e.type).forEach(e => e.noise = parseInt(this.value, 10)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#noise").on("change", function(e) {
            e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-pixelate").on("change", function() {
            e(this).is(":checked") ? j.backgroundImage.filters.push(new fabric.Image.filters.Pixelate) : (s.find("#pixelate").val(1), s.find("#pixelate").parent().parent().find(".slider-label span").html(1), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Pixelate" != e.type), j.backgroundImage.applyFilters()), j.requestRenderAll()
        }), s.find("#pixelate").on("change", function(e) {
            j.backgroundImage.filters.filter(e => "Pixelate" == e.type).forEach(e => e.blocksize = parseInt(this.value, 10)), j.backgroundImage.applyFilters(), j.requestRenderAll(), e.originalEvent && ge('<span class="material-icons">image</span>' + palleonParams.bg + " " + palleonParams.edited)
        }), s.find("#palleon-blend-color").on("change", function() {
            if (e(this).is(":checked")) {
                var a = s.find("#blend-color-mode").val(),
                    t = s.find("#blend-color-color").val(),
                    n = parseFloat(s.find("#blend-color-alpha").val());
                j.backgroundImage.filters.push(new fabric.Image.filters.BlendColor), j.backgroundImage.filters.filter(e => "BlendColor" == e.type).forEach(e => e.mode = a, e => e.color = t, e => e.alpha = parseFloat(n))
            } else s.find("#blend-color-mode").val("add"), s.find("#blend-color-color").spectrum("set", "#ffffff"), s.find("#blend-color-alpha").val(.5), s.find("#blend-color-alpha").parent().parent().find(".slider-label span").html(.5), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "BlendColor" != e.type);
            j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#blend-color-mode").on("change", function() {
            j.backgroundImage.filters.filter(e => "BlendColor" == e.type).forEach(e => e.mode = this.value), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#blend-color-color").on("change", function() {
            j.backgroundImage.filters.filter(e => "BlendColor" == e.type).forEach(e => e.color = this.value), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#blend-color-alpha").on("input", function() {
            j.backgroundImage.filters.filter(e => "BlendColor" == e.type).forEach(e => e.alpha = parseFloat(this.value)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#palleon-duotone-color").on("change", function() {
            e(this).is(":checked") ? (A = new fabric.Image.filters.Composed({
                subFilters: [new fabric.Image.filters.Grayscale({
                    mode: "luminosity"
                }), new fabric.Image.filters.BlendColor({
                    color: s.find("#duotone-light-color").val()
                }), new fabric.Image.filters.BlendColor({
                    color: s.find("#duotone-dark-color").val(),
                    mode: "lighten"
                })]
            }), j.backgroundImage.filters.push(A)) : (s.find("#duotone-light-color").spectrum("set", "green"), s.find("#duotone-dark-color").spectrum("set", "blue"), j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Composed" != e.type)), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#duotone-light-color").on("change", function() {
            j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Composed" != e.type), j.backgroundImage.filters.push(A), A.subFilters[1].color = e(this).val(), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#duotone-dark-color").on("change", function() {
            j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "Composed" != e.type), j.backgroundImage.filters.push(A), A.subFilters[2].color = e(this).val(), j.backgroundImage.applyFilters(), j.requestRenderAll()
        }), s.find("#palleon-swap-apply").on("click", function() {
            var a = new fabric.Image.filters.SwapColor({
                colorSource: s.find("#color-source").val(),
                colorDestination: s.find("#color-destination").val()
            });
            j.backgroundImage.filters.push(a), j.backgroundImage.applyFilters(), j.requestRenderAll(), e(this).prop("disabled", !0), s.find("#palleon-swap-remove").prop("disabled", !1)
        }), s.find("#palleon-swap-remove").on("click", function() {
            j.backgroundImage.filters = j.backgroundImage.filters.filter(e => "SwapColor" != e.type), j.backgroundImage.applyFilters(), j.requestRenderAll(), e(this).prop("disabled", !0), s.find("#palleon-swap-apply").prop("disabled", !1)
        }), s.find("#palleon-swap-colors").on("change", function() {
            e(this).is(":checked") || s.find("#palleon-swap-remove").trigger("click")
        });

        function Oe(e) {
            var a = j.getActiveObject();
            a.set("gradientFill", s.find("#palleon-" + e + "-gradient").val());
            var t = "";
            if ("" == s.find("#" + e + "-gradient-color-3").val() && "" == s.find("#" + e + "-gradient-color-4").val() ? t = [{
                    offset: 0,
                    color: s.find("#" + e + "-gradient-color-1").val()
                }, {
                    offset: 1,
                    color: s.find("#" + e + "-gradient-color-2").val()
                }] : "" != s.find("#" + e + "-gradient-color-3").val() && "" == s.find("#" + e + "-gradient-color-4").val() ? t = [{
                    offset: 0,
                    color: s.find("#" + e + "-gradient-color-1").val()
                }, {
                    offset: .5,
                    color: s.find("#" + e + "-gradient-color-2").val()
                }, {
                    offset: 1,
                    color: s.find("#" + e + "-gradient-color-3").val()
                }] : "" != s.find("#" + e + "-gradient-color-1").val() && "" != s.find("#" + e + "-gradient-color-2").val() && "" != s.find("#" + e + "-gradient-color-3").val() && "" != s.find("#" + e + "-gradient-color-4").val() && (t = [{
                    offset: 0,
                    color: s.find("#" + e + "-gradient-color-1").val()
                }, {
                    offset: .25,
                    color: s.find("#" + e + "-gradient-color-2").val()
                }, {
                    offset: .75,
                    color: s.find("#" + e + "-gradient-color-3").val()
                }, {
                    offset: 1,
                    color: s.find("#" + e + "-gradient-color-4").val()
                }]), "vertical" == s.find("#palleon-" + e + "-gradient").val()) {
                if (s.find("#" + e + "-gradient-settings").show(), s.find("#" + e + "-fill-color").hide(), a.set("fill", new fabric.Gradient({
                        type: "linear",
                        gradientUnits: "percentage",
                        coords: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        colorStops: t
                    })), a._objects)
                    for (var n = 0; n < a._objects.length; n++) "" != a._objects[n].fill && a._objects[n].set({
                        fill: new fabric.Gradient({
                            type: "linear",
                            gradientUnits: "percentage",
                            coords: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            colorStops: t
                        })
                    })
            } else if ("horizontal" == s.find("#palleon-" + e + "-gradient").val()) {
                if (s.find("#" + e + "-gradient-settings").show(), s.find("#" + e + "-fill-color").hide(), a.set("fill", new fabric.Gradient({
                        type: "linear",
                        gradientUnits: "percentage",
                        coords: {
                            x1: 0,
                            y1: 0,
                            x2: 1,
                            y2: 0
                        },
                        colorStops: t
                    })), a._objects)
                    for (n = 0; n < a._objects.length; n++) "" != a._objects[n].fill && a._objects[n].set({
                        fill: new fabric.Gradient({
                            type: "linear",
                            gradientUnits: "percentage",
                            coords: {
                                x1: 0,
                                y1: 0,
                                x2: 1,
                                y2: 0
                            },
                            colorStops: t
                        })
                    })
            } else if ("diagonal" == s.find("#palleon-" + e + "-gradient").val()) {
                if (s.find("#" + e + "-gradient-settings").show(), s.find("#" + e + "-fill-color").hide(), a.set("fill", new fabric.Gradient({
                        type: "linear",
                        gradientUnits: "percentage",
                        coords: {
                            x1: 0,
                            y1: 0,
                            x2: 1,
                            y2: 1
                        },
                        colorStops: t
                    })), a._objects)
                    for (n = 0; n < a._objects.length; n++) "" != a._objects[n].fill && a._objects[n].set({
                        fill: new fabric.Gradient({
                            type: "linear",
                            gradientUnits: "percentage",
                            coords: {
                                x1: 0,
                                y1: 0,
                                x2: 1,
                                y2: 1
                            },
                            colorStops: t
                        })
                    })
            } else if (s.find("#" + e + "-gradient-settings").hide(), s.find("#" + e + "-fill-color").show(), a.set("fill", s.find("#palleon-" + e + "-color").val()), a._objects)
                for (n = 0; n < a._objects.length; n++) "" != a._objects[n].fill && a._objects[n].set("fill", s.find("#palleon-" + e + "-color").val());
            j.requestRenderAll()
        }
        e.each(["text", "image", "shape", "element"], function(a, t) {
            s.find("#palleon-" + t + "-shadow").on("change", function() {
                var a = new fabric.Shadow({
                    color: s.find("#" + t + "-shadow-color").val(),
                    blur: s.find("#" + t + "-shadow-blur").val(),
                    offsetX: s.find("#" + t + "-shadow-offset-x").val(),
                    offsetY: s.find("#" + t + "-shadow-offset-y").val()
                });
                e(this).is(":checked") ? j.getActiveObject().shadow = a : j.getActiveObject().shadow = null, j.requestRenderAll()
            }), s.find("#" + t + "-shadow-color").bind("change", function() {
                j.getActiveObject().shadow.color = e(this).val(), j.requestRenderAll()
            }), s.find("#" + t + "-shadow-settings input[type=number]").bind("input paste keyup keydown", function() {
                var a = e(this).val();
                e(this).attr("id") == t + "-shadow-blur" ? j.getActiveObject().shadow.blur = parseInt(a) : e(this).attr("id") == t + "-shadow-offset-x" ? j.getActiveObject().shadow.offsetX = parseInt(a) : e(this).attr("id") == t + "-shadow-offset-y" && (j.getActiveObject().shadow.offsetY = parseInt(a)), j.requestRenderAll()
            })
        });

        function Re() {
            var e = j.backgroundImage.getScaledHeight(),
                a = j.backgroundImage.getScaledWidth();
            return 0 != y && 180 != y && -180 != y || (e = j.backgroundImage.getScaledWidth(), a = j.backgroundImage.getScaledHeight()), [e, a]
        }
        e.each(["text", "shape", "element"], function(e, a) {
            s.find("#palleon-" + a + "-gradient").on("change", function() {
                Oe(a)
            }), s.find("#" + a + "-gradient-color-1").on("change", function() {
                Oe(a)
            }), s.find("#" + a + "-gradient-color-2").on("change", function() {
                Oe(a)
            }), s.find("#" + a + "-gradient-color-3").on("change", function() {
                Oe(a)
            }), s.find("#" + a + "-gradient-color-4").on("change", function() {
                Oe(a)
            })
        });
        var Fe = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "curabitur", "vel", "hendrerit", "libero", "eleifend", "blandit", "nunc", "ornare", "odio", "ut", "orci", "gravida", "imperdiet", "nullam", "purus", "lacinia", "a", "pretium", "quis", "congue", "praesent", "sagittis", "laoreet", "auctor", "mauris", "non", "velit", "eros", "dictum", "proin", "accumsan", "sapien", "nec", "massa", "volutpat", "venenatis", "sed", "eu", "molestie", "lacus", "quisque", "porttitor", "ligula", "dui", "mollis", "tempus", "at", "magna", "vestibulum", "turpis", "ac", "diam", "tincidunt", "id", "condimentum", "enim", "sodales", "in", "hac", "habitasse", "platea", "dictumst", "aenean", "neque", "fusce", "augue", "leo", "eget", "semper", "mattis", "tortor", "scelerisque", "nulla", "interdum", "tellus", "malesuada", "rhoncus", "porta", "sem", "aliquet", "et", "nam", "suspendisse", "potenti", "vivamus", "luctus", "fringilla", "erat", "donec", "justo", "vehicula", "ultricies", "varius", "ante", "primis", "faucibus", "ultrices", "posuere", "cubilia", "curae", "etiam", "cursus", "aliquam", "quam", "dapibus", "nisl", "feugiat", "egestas", "class", "aptent", "taciti", "sociosqu", "ad", "litora", "torquent", "per", "conubia", "nostra", "inceptos", "himenaeos", "phasellus", "nibh", "pulvinar", "vitae", "urna", "iaculis", "lobortis", "nisi", "viverra", "arcu", "morbi", "pellentesque", "metus", "commodo", "ut", "facilisis", "felis", "tristique", "ullamcorper", "placerat", "aenean", "convallis", "sollicitudin", "integer", "rutrum", "duis", "est", "etiam", "bibendum", "donec", "pharetra", "vulputate", "maecenas", "mi", "fermentum", "consequat", "suscipit", "aliquam", "habitant", "senectus", "netus", "fames", "quisque", "euismod", "curabitur", "lectus", "elementum", "tempor", "risus", "cras"];
        s.find("#palleon-dummy-text").on("click", function() {
            var e = function(e, a) {
                    const t = [];
                    for (let n = 0; n < a; n++) {
                        const a = e[Math.floor(Math.random() * e.length)];
                        t.push(a)
                    }
                    return t
                }(Fe, 10),
                a = "",
                t = s.find("#palleon-text-input").val();
            e.forEach(function(e, t, n) {
                a += e, t === n.length - 1 ? a += "." : a += " "
            });
            var n = t + (a = a.replace(/^./, a[0].toUpperCase()));
            s.find("#palleon-text-input").val(n), s.find("#palleon-text-input").trigger("input")
        }), s.find("#palleon-add-text").on("click", function() {
            var e = j.getObjects().filter(e => "printarea" == e.objectType)[0],
                a = "";
            if (e) {
                var t = Math.floor(e.width / 14);
                a = new fabric.Textbox(palleonParams.textbox, {
                    objectType: "textbox",
                    gradientFill: "none",
                    fontSize: t,
                    fontFamily: c.fontFamily,
                    fontWeight: c.fontWeight,
                    fontStyle: c.fontStyle,
                    lineHeight: c.lineHeight,
                    fill: c.fill,
                    stroke: c.stroke,
                    strokeWidth: c.strokeWidth,
                    textBackgroundColor: c.textBackgroundColor,
                    textAlign: c.textAlign,
                    width: .8 * e.width,
                    top: e.top,
                    left: e.left,
                    originX: "center",
                    originY: "center"
                })
            } else a = new fabric.Textbox(palleonParams.textbox, {
                objectType: "textbox",
                gradientFill: "none",
                fontSize: c.fontSize,
                fontFamily: c.fontFamily,
                fontWeight: c.fontWeight,
                fontStyle: c.fontStyle,
                lineHeight: c.lineHeight,
                fill: c.fill,
                stroke: c.stroke,
                strokeWidth: c.strokeWidth,
                textBackgroundColor: c.textBackgroundColor,
                textAlign: c.textAlign,
                width: Re()[0] / 2,
                top: Re()[1] / 2,
                left: Re()[0] / 2,
                originX: "center",
                originY: "center"
            });
            j.add(a), j.setActiveObject(a), j.fire("palleon:history", {
                type: "textbox",
                text: palleonParams.added
            })
        }), s.find("#palleon-text-input").bind("input paste", function() {
            j.getActiveObject().set("text", e(this).val()), s.find("#palleon-layers #" + j.getActiveObject().id + " .layer-name").html(j.getActiveObject().text), j.requestRenderAll()
        }), s.find("#palleon-text-input").bind("focusout", function() {
            j.fire("palleon:history", {
                type: "textbox",
                text: palleonParams.edited
            })
        }), s.find("#palleon-font-family").on("change", function() {
            var a = e(this).val(),
                t = e(this).find("option:selected").text(),
                n = "yes";
            if (R.includes(t)) n = "no";
            else
                for (var l = 0; l < Y.length; l++)
                    if (Y[l][1] == a) {
                        n = "no";
                        break
                    } if ("yes" == n) {
                "undefined" == typeof palleonCustomFonts ? WebFont.load({
                    google: {
                        families: [a + ":regular,bold", a + ":italic,regular,bold"]
                    }
                }) : palleonCustomFonts.fonts.includes(a) || WebFont.load({
                    google: {
                        families: [a + ":regular,bold", a + ":italic,regular,bold"]
                    }
                });
                var i = new FontFaceObserver(a, {
                        weight: "normal",
                        style: "normal"
                    }),
                    o = new FontFaceObserver(a, {
                        weight: "bold",
                        style: "normal"
                    }),
                    r = new FontFaceObserver(a, {
                        weight: "normal",
                        style: "italic"
                    }),
                    s = new FontFaceObserver(a, {
                        weight: "bold",
                        style: "italic"
                    });
                Promise.all([i.load(null, 5e3), o.load(null, 5e3), r.load(null, 5e3), s.load(null, 5e3)]).then(function() {
                    j.getActiveObject().set("fontFamily", a), j.requestRenderAll()
                }).catch(function(e) {
                    console.log(e)
                })
            } else j.getActiveObject().set("fontFamily", a), j.requestRenderAll()
        });
        var qe = 0;

        function Xe(a) {
            var t = a.element;
            return e(t).data("icon") ? e('<div class="select2-item"><span class="material-icons">' + e(t).data("icon") + "</span>" + a.text + "</div>") : e(t).data("font") ? e('<div class="select2-item" style="font-family:' + e(t).data("font") + '">' + a.text + "</div>") : e('<div class="select2-item">' + a.text + "</div>")
        }
        s.find("#palleon-font-family").on("select2:open", function() {
            s.find("#select2-palleon-font-family-results").scroll(function() {
                e(this).find("li:last-child").find("ul li").each(function() {
                    var a = e(this),
                        t = a.find("div").text();
                    a.is(":in-viewport( 0, #select2-palleon-font-family-results)") && (R.includes(t) || (WebFont.load({
                        google: {
                            families: [a.find(".select2-item").html()]
                        },
                        inactive: function() {
                            WebFont.load({
                                custom: {
                                    families: [a.find(".select2-item").html()],
                                    urls: ["https://fonts.googleapis.com/css?family=" + a.find(".select2-item").html() + "&text=abc"]
                                },
                                active: function() {
                                    console.log("active")
                                }
                            })
                        }
                    }), R.push(t)))
                })
            }), s.on("keypress", ".select2-search .select2-search__field", function(e) {
                window.clearTimeout(qe), qe = setTimeout(function() {
                    s.find("#select2-palleon-font-family-results").trigger("scroll")
                }, 500)
            })
        }), s.find("#palleon-text-format-btns > .palleon-btn").on("click", function() {
            if ("format-uppercase" == e(this).attr("id")) {
                var a = s.find("#palleon-text-input").val();
                a = a === a.toUpperCase() ? a.toLowerCase() : a.toUpperCase(), s.find("#palleon-text-input").val(a), s.find("#palleon-text-input").trigger("input")
            }
            e(this).hasClass("active") ? ("format-bold" == e(this).attr("id") && (j.getActiveObject().set("fontWeight", "normal"), e(this).removeClass("active")), "format-italic" == e(this).attr("id") && (j.getActiveObject().set("fontStyle", "normal"), e(this).removeClass("active")), "format-underlined" == e(this).attr("id") && (j.getActiveObject().set("underline", !1), e(this).removeClass("active"))) : ("format-bold" == e(this).attr("id") && j.getActiveObject().set("fontWeight", "bold"), "format-italic" == e(this).attr("id") && j.getActiveObject().set("fontStyle", "italic"), "format-underlined" == e(this).attr("id") && j.getActiveObject().set("underline", !0), "format-align-left" == e(this).attr("id") && j.getActiveObject().set("textAlign", "left"), "format-align-right" == e(this).attr("id") && j.getActiveObject().set("textAlign", "right"), "format-align-center" == e(this).attr("id") && j.getActiveObject().set("textAlign", "center"), "format-align-justify" == e(this).attr("id") && j.getActiveObject().set("textAlign", "justify"), s.find(".format-align").removeClass("active"), "format-uppercase" != e(this).attr("id") && e(this).addClass("active")), j.requestRenderAll(), j.fire("palleon:history", {
                type: "textbox",
                text: palleonParams.edited
            })
        }), s.find("#palleon-text-settings input[type=number]").bind("input paste keyup keydown", function() {
            var a = e(this).val();
            "palleon-font-size" == e(this).attr("id") ? j.getActiveObject().set("fontSize", parseInt(a)) : "palleon-outline-size" == e(this).attr("id") ? j.getActiveObject().set("strokeWidth", parseInt(a)) : "palleon-line-height" == e(this).attr("id") ? j.getActiveObject().set("lineHeight", parseFloat(a)) : "palleon-letter-spacing" == e(this).attr("id") && j.getActiveObject().set("charSpacing", parseInt(a)), j.requestRenderAll()
        }), s.find("#palleon-text-settings input[type=number]").bind("input", function() {
            window.clearTimeout(O), O = setTimeout(function() {
                j.fire("palleon:history", {
                    type: "textbox",
                    text: palleonParams.edited
                })
            }, 500)
        }), s.find("#palleon-text-settings .palleon-colorpicker").bind("change", function() {
            var a = e(this).val();
            "palleon-text-color" == e(this).attr("id") ? j.getActiveObject().set("fill", a) : "palleon-outline-color" == e(this).attr("id") ? j.getActiveObject().set("stroke", a) : "palleon-text-background" == e(this).attr("id") && j.getActiveObject().set("textBackgroundColor", a), j.requestRenderAll(), j.fire("palleon:history", {
                type: "textbox",
                text: palleonParams.edited
            })
        }), s.find("#palleon-text-flip-btns > .palleon-btn").on("click", function() {
            e(this).hasClass("active") ? ("text-flip-x" == e(this).attr("id") ? j.getActiveObject().set("flipX", !1) : "text-flip-y" == e(this).attr("id") && j.getActiveObject().set("flipY", !1), e(this).removeClass("active")) : ("text-flip-x" == e(this).attr("id") ? j.getActiveObject().set("flipX", !0) : "text-flip-y" == e(this).attr("id") && j.getActiveObject().set("flipY", !0), e(this).addClass("active")), j.requestRenderAll(), j.fire("palleon:history", {
                type: "textbox",
                text: palleonParams.edited
            })
        }), s.find("#palleon-text-settings input[type=range]").bind("input click", function() {
            var a = e(this).val();
            "text-skew-x" == e(this).attr("id") ? j.getActiveObject().set("skewX", parseInt(a)) : "text-skew-y" == e(this).attr("id") ? j.getActiveObject().set("skewY", parseInt(a)) : "text-rotate" == e(this).attr("id") ? j.getActiveObject().set("angle", parseInt(a)) : "text-opacity" == e(this).attr("id") && j.getActiveObject().set("opacity", parseFloat(a)), j.requestRenderAll()
        }), s.find("#palleon-text-settings input[type=range]").bind("change", function() {
            j.fire("palleon:history", {
                type: "textbox",
                text: palleonParams.edited
            })
        }), s.find("#palleon-img-upload").on("change", function(a) {
            if ("" != e(this).val()) {
                if (e(this).data("max") && "" != e(this).data("max") && this.files[0].size > parseInt(e(this).data("max"))) return toastr.error(palleonParams.maxUploadSize + " " + parseInt(e(this).data("max")) / 1048576 + "MB.", palleonParams.error), void(this.value = "");
                var t = Re()[1] / 2,
                    n = Re()[0] / 2,
                    l = j.getObjects().filter(e => "printarea" == e.objectType)[0];
                l && (t = l.top, n = l.left);
                var i = new FileReader;
                i.onload = function(e) {
                    var a = new Image;
                    G(e.target.result, function(e) {
                        a.src = e, a.onload = function() {
                            var e = new fabric.Image(a);
                            e.set({
                                objectType: "image",
                                objectCaching: !0,
                                roundedCorders: 0,
                                stroke: "#fff",
                                strokeWidth: 0,
                                top: t,
                                left: n,
                                originX: "center",
                                originY: "center"
                            }), e.set({
                                ogWidth: e.get("width"),
                                ogHeight: e.get("height")
                            }), j.add(e), l ? (e.scaleToWidth(.8 * l.width * j.getZoom()), e.isContainedWithinObject(l) || e.scaleToHeight(.8 * l.height * j.getZoom())) : (e.scaleToWidth(Re()[0] / 4), e.isPartiallyOnScreen() && e.scaleToHeight(Re()[1] / 4)), j.setActiveObject(e), j.requestRenderAll()
                        }
                    })
                }, i.readAsDataURL(a.target.files[0]), j.fire("palleon:history", {
                    type: "image",
                    text: palleonParams.added
                })
            }
        }), s.find("#palleon-overlay-img-upload").on("change", function(a) {
            if ("" != e(this).val()) {
                s.find("#palleon-canvas-loader").css("display", "flex");
                var t = new FileReader;
                t.onload = function(e) {
                    var a = new Image;
                    G(e.target.result, function(t) {
                        a.src = t, a.onload = function() {
                            var t = new fabric.Image(a);
                            t.set({
                                scaleX: Re()[0] / t.width,
                                scaleY: Re()[1] / t.height,
                                objectCaching: !1,
                                originX: "left",
                                originY: "top",
                                selectable: !1,
                                lockMovementX: !0,
                                lockMovementY: !0,
                                lockRotation: !0,
                                erasable: !0
                            }), j.setOverlayImage(t, j.renderAll.bind(j)), s.find("#palleon-overlay-wrap").show(), s.find("#palleon-overlay-preview").attr("src", e.target.result), setTimeout(function() {
                                s.find("#palleon-canvas-loader").hide()
                            }, 500)
                        }
                    })
                }, t.readAsDataURL(a.target.files[0]), j.fire("palleon:history", {
                    type: "image",
                    text: palleonParams.added
                })
            }
        }), s.find("#palleon-overlay-delete").on("click", function() {
            void 0 !== j.overlayImage && null !== j.overlayImage && (j.overlayImage = null, s.find("#palleon-overlay-wrap").hide(), s.find("#palleon-overlay-preview").attr("src", ""), j.requestRenderAll())
        }), s.find("#img-flip-horizontal").on("click", function() {
            j.getActiveObject().toggle("flipX"), j.requestRenderAll(), j.fire("palleon:history", {
                type: "image",
                text: palleonParams.edited
            })
        }), s.find("#img-flip-vertical").on("click", function() {
            j.getActiveObject().toggle("flipY"), j.requestRenderAll(), j.fire("palleon:history", {
                type: "image",
                text: palleonParams.edited
            })
        });
        s.find("#img-border-radius").on("input", function() {
            j.getActiveObject().set("clipPath", ((e, a) => new fabric.Rect({
                width: e.width,
                height: e.height,
                rx: a / e.scaleX,
                ry: a / e.scaleY,
                left: -e.width / 2,
                top: -e.height / 2
            }))(j.getActiveObject(), parseInt(e(this).val()))), j.getActiveObject().set("roundedCorders", parseInt(e(this).val())), j.requestRenderAll()
        }), s.find("#img-border-radius").bind("change", function() {
            j.fire("palleon:history", {
                type: "image",
                text: palleonParams.edited
            })
        }), s.find("#img-border-color").bind("change", function() {
            j.getActiveObject().set("stroke", e(this).val()), j.requestRenderAll(), j.fire("palleon:history", {
                type: "image",
                text: palleonParams.edited
            })
        }), s.find("#palleon-image-settings input[type=number]").on("input paste", function() {
            var a = parseInt(e(this).val());
            "img-border-width" == e(this).attr("id") && j.getActiveObject().set("strokeWidth", a), j.requestRenderAll()
        }), s.find("#palleon-image-settings input[type=number]").bind("input", function() {
            window.clearTimeout(O), O = setTimeout(function() {
                j.fire("palleon:history", {
                    type: "image",
                    text: palleonParams.edited
                })
            }, 500)
        }), s.find("#palleon-image-settings input[type=range]").bind("input click", function() {
            var a = e(this).val();
            "img-skew-x" == e(this).attr("id") ? j.getActiveObject().set("skewX", parseInt(a)) : "img-skew-y" == e(this).attr("id") ? j.getActiveObject().set("skewY", parseInt(a)) : "img-rotate" == e(this).attr("id") ? j.getActiveObject().set("angle", parseInt(a)) : "img-opacity" == e(this).attr("id") && j.getActiveObject().set("opacity", parseFloat(a)), j.requestRenderAll()
        }), s.find("#palleon-image-settings input[type=range]").bind("change", function() {
            j.fire("palleon:history", {
                type: "image",
                text: palleonParams.edited
            })
        }), s.find("#shape-rounded-corners").on("input", function() {
            var a = parseInt(e(this).val()),
                t = j.getActiveObject();
            "square" != t.objectType && "rectangle" != t.objectType || (t.set("rx", a), t.set("ry", a)), j.requestRenderAll()
        }), s.on("click", "#palleon-shapes-grid > div", function() {
            var a = e(this).attr("data-id");
            "printarea" == a && (j.getObjects().filter(e => "BG" != e.objectType).forEach(e => j.remove(e)), s.find("#palleon-layers li").remove());
            var t = Re()[1] / 2,
                n = Re()[0] / 2,
                l = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            if (l && (t = l.top, n = l.left), "customShape" == a) {
                var i = (new XMLSerializer).serializeToString(e(this)[0]);
                fabric.loadSVGFromString(i, function(e, a) {
                    var i = fabric.util.groupSVGElements(e, a);
                    i.set("originX", "center"), i.set("originY", "center"), i.set("left", n), i.set("top", t), i.set("objectType", "customShape"), i.set("gradientFill", "none"), i.set("stroke", "#000"), i.set("strokeWidth", 0), i.set("fill", "#fff"), j.add(i), l ? (i.scaleToWidth(.5 * l.width * j.getZoom()), i.isContainedWithinObject(l) || i.scaleToHeight(.5 * l.height * j.getZoom())) : (i.scaleToWidth(Re()[0] / 8), i.isPartiallyOnScreen() && i.scaleToHeight(Re()[1] / 8)), j.setActiveObject(i), j.requestRenderAll(), j.fire("palleon:history", {
                        type: "customShape",
                        text: palleonParams.added
                    })
                }, function() {}, {
                    crossOrigin: "anonymous"
                })
            } else {
                var o = "",
                    r = "";
                "circle" == a ? (o = new fabric.Circle({
                    radius: 50,
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "circle",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })).controls = {
                    ...fabric.Rect.prototype.controls,
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    })
                } : "ellipse" == a ? o = new fabric.Ellipse({
                    rx: 75,
                    ry: 50,
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "ellipse",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                }) : "square" == a ? (o = new fabric.Rect({
                    radius: 50,
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "square",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })).controls = {
                    ...fabric.Rect.prototype.controls,
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    })
                } : "rectangle" == a ? o = new fabric.Rect({
                    radius: 50,
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "rectangle",
                    width: 200,
                    height: 150,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                }) : "triangle" == a ? o = new fabric.Triangle({
                    radius: 50,
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "triangle",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                }) : "trapezoid" == a ? (r = [{
                    x: -100,
                    y: -50
                }, {
                    x: 100,
                    y: -50
                }, {
                    x: 150,
                    y: 50
                }, {
                    x: -150,
                    y: 50
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "trapezoid",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "pentagon" == a ? (r = [{
                    x: 26,
                    y: 86
                }, {
                    x: 11.2,
                    y: 40.4
                }, {
                    x: 50,
                    y: 12.2
                }, {
                    x: 88.8,
                    y: 40.4
                }, {
                    x: 74,
                    y: 86
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "pentagon",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "octagon" == a ? (r = [{
                    x: 34.2,
                    y: 87.4
                }, {
                    x: 12.3,
                    y: 65.5
                }, {
                    x: 12.3,
                    y: 34.5
                }, {
                    x: 34.2,
                    y: 12.6
                }, {
                    x: 65.2,
                    y: 12.6
                }, {
                    x: 87.1,
                    y: 34.5
                }, {
                    x: 87.1,
                    y: 65.5
                }, {
                    x: 65.2,
                    y: 87.4
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "octagon",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "emerald" == a ? (r = [{
                    x: 850,
                    y: 75
                }, {
                    x: 958,
                    y: 137.5
                }, {
                    x: 958,
                    y: 262.5
                }, {
                    x: 850,
                    y: 325
                }, {
                    x: 742,
                    y: 262.5
                }, {
                    x: 742,
                    y: 137.5
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "emerald",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "star" == a ? (r = [{
                    x: 350,
                    y: 75
                }, {
                    x: 380,
                    y: 160
                }, {
                    x: 470,
                    y: 160
                }, {
                    x: 400,
                    y: 215
                }, {
                    x: 423,
                    y: 301
                }, {
                    x: 350,
                    y: 250
                }, {
                    x: 277,
                    y: 301
                }, {
                    x: 303,
                    y: 215
                }, {
                    x: 231,
                    y: 161
                }, {
                    x: 321,
                    y: 161
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "star",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "diamond" == a ? (r = [{
                    x: 69.445,
                    y: 125
                }, {
                    x: 125,
                    y: 28.774
                }, {
                    x: 180.556,
                    y: 125
                }, {
                    x: 125,
                    y: 221.227
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "diamond",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "parallelogram" == a ? (r = [{
                    x: 15,
                    y: 10
                }, {
                    x: 55,
                    y: 10
                }, {
                    x: 45,
                    y: 20
                }, {
                    x: 5,
                    y: 20
                }], o = new fabric.Polygon(r, {
                    fill: "#fff",
                    stroke: "#000",
                    strokeWidth: 0,
                    objectType: "parallelogram",
                    width: 100,
                    height: 100,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    originX: "center",
                    originY: "center"
                })) : "printarea" == a && ((o = new fabric.Rect({
                    radius: 50,
                    fill: "",
                    stroke: "#4affff",
                    strokeWidth: 3,
                    strokeDashArray: [10, 5],
                    objectType: "printarea",
                    width: b / 2,
                    height: v / 2,
                    gradientFill: "none",
                    top: t,
                    left: n,
                    lockRotation: !0,
                    lockScalingX: !0,
                    lockScalingY: !0,
                    originX: "center",
                    originY: "center"
                })).controls = {
                    ...fabric.Rect.prototype.controls,
                    mtr: new fabric.Control({
                        visible: !1
                    }),
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    }),
                    tl: new fabric.Control({
                        visible: !1
                    }),
                    bl: new fabric.Control({
                        visible: !1
                    }),
                    tr: new fabric.Control({
                        visible: !1
                    }),
                    br: new fabric.Control({
                        visible: !1
                    })
                }), j.add(o), l ? (o.scaleToWidth(.5 * l.width * j.getZoom()), o.isContainedWithinObject(l) || o.scaleToHeight(.5 * l.height * j.getZoom())) : "printarea" != o.objectType && (o.scaleToWidth(Re()[0] / 6), o.isPartiallyOnScreen() && o.scaleToHeight(Re()[1] / 6)), j.setActiveObject(o), j.requestRenderAll(), j.fire("palleon:history", {
                    type: a,
                    text: palleonParams.added
                })
            }
        }), s.find("#palleon-shape-loadmore").on("click", function() {
            var a = e(this);
            a.html(palleonParams.loading), a.prop("disabled", !0), e.getJSON(palleonParams.baseURL + "json/shapes.json", function(t) {
                e.each(t, function(e, a) {
                    var t = '<div class="palleon-shape" data-id="customShape" title="' + palleonParams.customShape + '">' + a + "</div>";
                    s.find("#palleon-shapes-grid").append(t)
                }), a.remove()
            })
        }), s.find("#palleon-shape-settings .palleon-colorpicker").bind("change", function() {
            var a = e(this).val();
            "palleon-shape-color" == e(this).attr("id") ? j.getActiveObject().set("fill", a) : "shape-outline-color" == e(this).attr("id") && j.getActiveObject().set("stroke", a), j.requestRenderAll(), j.fire("palleon:history", {
                type: j.getActiveObject().objectType,
                text: palleonParams.edited
            })
        }), s.find("#palleon-shape-settings input[type=range]").bind("input click", function() {
            var a = e(this).val();
            "shape-skew-x" == e(this).attr("id") ? j.getActiveObject().set("skewX", parseInt(a)) : "shape-skew-y" == e(this).attr("id") ? j.getActiveObject().set("skewY", parseInt(a)) : "shape-rotate" == e(this).attr("id") ? j.getActiveObject().set("angle", parseInt(a)) : "shape-opacity" == e(this).attr("id") && j.getActiveObject().set("opacity", parseFloat(a)), j.requestRenderAll()
        }), s.find("#palleon-shape-settings input[type=range]").bind("change", function() {
            j.fire("palleon:history", {
                type: j.getActiveObject().objectType,
                text: palleonParams.edited
            })
        }), s.find("#palleon-shape-settings input[type=number]").bind("input paste", function() {
            var a = parseInt(e(this).val());
            "shape-outline-width" == e(this).attr("id") ? j.getActiveObject().set("strokeWidth", a) : "shape-custom-width" == e(this).attr("id") ? (j.getActiveObject().set("width", a), j.getActiveObject().set("scaleX", 1)) : "shape-custom-height" == e(this).attr("id") && (j.getActiveObject().set("height", a), j.getActiveObject().set("scaleY", 1)), j.requestRenderAll()
        }), s.find("#palleon-shape-settings input[type=number]").bind("input", function() {
            window.clearTimeout(O), O = setTimeout(function() {
                j.fire("palleon:history", {
                    type: j.getActiveObject().objectType,
                    text: palleonParams.edited
                })
            }, 500)
        }), s.find("#shape-custom-width").bind("input paste", function() {
            if (s.find("#palleon-shape-ratio-lock").hasClass("active")) {
                var a = parseInt(e(this).val()),
                    t = parseInt(s.find("#palleon-shape-ratio-w").val()),
                    n = a * parseInt(s.find("#palleon-shape-ratio-h").val()) / t;
                s.find("#shape-custom-height").val(Math.round(n)), j.getActiveObject().set("height", n), j.getActiveObject().set("scaleY", 1)
            }
        }), s.find("#shape-custom-height").bind("input paste", function() {
            if (s.find("#palleon-shape-ratio-lock").hasClass("active")) {
                var a = e(this).val() * parseInt(s.find("#palleon-shape-ratio-w").val()) / parseInt(s.find("#palleon-shape-ratio-h").val());
                s.find("#shape-custom-width").val(Math.round(a)), j.getActiveObject().set("width", a), j.getActiveObject().set("scaleX", 1)
            }
        });

        function Ye(a) {
            var t = j.getObjects().filter(e => "frame" == e.objectType),
                n = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            e.each(t, function(e, t) {
                var l = t.angle,
                    i = t.width,
                    o = t.height,
                    r = Re()[1] / 2,
                    s = Re()[0] / 2,
                    d = Re()[0],
                    c = Re()[1];
                0 != l && 180 != l && -180 != l || (d = Re()[1], c = Re()[0]), n && (r = n.top, s = n.left, d = n.width, c = n.height, 0 != l && 180 != l && -180 != l || (d = n.height, c = n.width)), "right" == a ? 0 == l ? l = 90 : 90 == l ? l = 180 : 180 == l ? l = 270 : 270 == l ? l = 0 : -90 == l ? l = 0 : -180 == l ? l = -90 : -270 == l && (l = -180) : "left" == a && (0 == l ? l = -90 : -90 == l ? l = -180 : -180 == l ? l = -270 : -270 == l ? l = 0 : 90 == l ? l = 0 : 180 == l ? l = 90 : 270 == l && (l = 180)), t.set("left", s), t.set("top", r), t.set("scaleX", d / i), t.set("scaleY", c / o), t.set("angle", l)
            }), j.requestRenderAll(), j.fire("palleon:history", {
                type: "frame",
                text: palleonParams.edited
            })
        }
        s.find("#palleon-frame-search").on("keyup input", function() {
            s.find("#palleon-noframes").hide();
            var a = e(this).val().toLowerCase().replace(/\s/g, " ");
            "" == a || a.length < 1 ? (s.find("#palleon-frames-wrap li").show(), s.find("#palleon-frame-search-icon").html("search"), s.find("#palleon-frame-search-icon").removeClass("cancel")) : (s.find("#palleon-frame-search-icon").html("clear"), s.find("#palleon-frame-search-icon").addClass("cancel"), function(e) {
                e = e.toLowerCase().replace(" ", "-"), s.find("#palleon-frames-wrap li").hide().filter('[data-keyword*="' + e + '"]').show()
            }(a), 0 === s.find("#palleon-frames-wrap li:visible").length && s.find("#palleon-noframes").show())
        }), s.find("#palleon-frame-search-icon").on("click", function() {
            e(this).hasClass("cancel") && (e(this).removeClass("cancel"), e(this).html("search"), s.find("#palleon-frame-search").val(""), s.find("#palleon-frames-wrap li").show(), s.find("#palleon-noframes").hide())
        }), s.find(".palleon-frames-grid").on("click", ".palleon-frame img", function() {
            s.find("#palleon-canvas-loader").css("display", "flex");
            var a = e(this).parent().parent(),
                t = a.data("elsource");
            s.find(".palleon-frames-grid .palleon-frame").removeClass("active"), a.addClass("active"), fabric.loadSVGFromURL(t, function(e, a) {
                var t = Re()[1] / 2,
                    n = Re()[0] / 2,
                    l = Re()[0] + 2,
                    i = Re()[1] + 2,
                    o = j.getObjects().filter(e => "printarea" == e.objectType)[0];
                o && (t = o.top, n = o.left, l = o.width, i = o.height);
                var r = fabric.util.groupSVGElements(e, a),
                    d = r.width,
                    c = r.height;
                r.set("originX", "center"), r.set("originY", "center"), r.set("left", n), r.set("top", t), r.set("scaleX", l / d), r.set("scaleY", i / c), r.set("objectType", "frame"), j.add(r), j.setActiveObject(r), o && s.find("#palleon-layers #" + r.id).find("a.lock-layer").trigger("click"), j.requestRenderAll(), s.find("#palleon-canvas-loader").hide()
            }, function() {}, {
                crossOrigin: "anonymous"
            }), j.fire("palleon:history", {
                type: "frame",
                text: palleonParams.added
            })
        }), s.find(".palleon-frames-grid").on("click", ".frame-favorite button.star", function() {
            var a = e(this),
                t = a.data("frameid"),
                n = "add";
            a.hasClass("favorited") ? (s.find('*[data-frameid="' + t + '"]').removeClass("favorited"), n = "remove") : s.find('*[data-frameid="' + t + '"]').addClass("favorited");
            var l = {
                action: "favframe",
                nonce: palleonParams.nonce,
                frameid: t,
                mode: n
            };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: l,
                type: "POST",
                success: function(a) {
                    if ("add" == n ? (s.find('*[data-frameid="' + t + '"]').html('<span class="material-icons">star</span>'), toastr.success(palleonParams.favorited, palleonParams.success)) : (s.find('*[data-frameid="' + t + '"]').html('<span class="material-icons">star_border</span>'), toastr.success(palleonParams.unfavorited, palleonParams.success)), a) {
                        s.find("#palleon-frame-favorites > div").html(a), z.update();
                        var l = e("#palleon-frame-favorites").find(".palleon-frame").length;
                        s.find("#frames-favorites-count").html(l)
                    }
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-frame-color").bind("change", function() {
            var a = e(this).val(),
                t = j.getObjects().filter(e => "frame" == e.objectType);
            e.each(t, function(e, t) {
                pe(t) && t.set("fill", a)
            }), j.requestRenderAll(), j.fire("palleon:history", {
                type: "frame",
                text: palleonParams.edited
            })
        }), s.find("#palleon-rotate-right-frame").on("click", function() {
            Ye("right")
        }), s.find("#palleon-rotate-left-frame").on("click", function() {
            Ye("left")
        }), s.find("#palleon-flip-horizontal-frame").on("click", function() {
            var a = j.getObjects().filter(e => "frame" == e.objectType);
            e.each(a, function(e, a) {
                a.toggle("flipX")
            }), j.requestRenderAll(), j.fire("palleon:history", {
                type: "frame",
                text: palleonParams.edited
            })
        }), s.find("#palleon-flip-vertical-frame").on("click", function() {
            var a = j.getObjects().filter(e => "frame" == e.objectType);
            e.each(a, function(e, a) {
                a.toggle("flipY")
            }), j.requestRenderAll(), j.fire("palleon:history", {
                type: "frame",
                text: palleonParams.edited
            })
        });
        s.find("#palleon-illustration-search").on("keyup input", function() {
            s.find("#palleon-noillustrations").hide();
            var a = e(this).val().toLowerCase();
            "" == a || a.length < 1 ? (s.find("#palleon-illustrations-grid > div").show(), s.find("#palleon-illustration-search-icon").html("search"), s.find("#palleon-illustration-search-icon").removeClass("cancel")) : (s.find("#palleon-illustration-search-icon").html("clear"), s.find("#palleon-illustration-search-icon").addClass("cancel"), function(e) {
                e = e.toLowerCase().replace(" ", "-"), s.find("#palleon-illustrations-grid > div").hide().filter('[data-keyword*="' + e + '"]').show()
            }(a), 0 === s.find("#palleon-illustrations-grid > div:visible").length && s.find("#palleon-noillustrations").show())
        }), s.find("#palleon-illustration-search-icon").on("click", function() {
            e(this).hasClass("cancel") && (e(this).removeClass("cancel"), e(this).html("search"), s.find("#palleon-illustration-search").val(""), s.find("#palleon-illustrations-grid > div").show(), s.find("#palleon-noillustrations").hide())
        });
        s.find("#palleon-element-search").on("keyup input", function() {
            s.find("#palleon-noelements").hide();
            var a = e(this).val().toLowerCase().replace(/\s/g, " ");
            "" == a || a.length < 1 ? (s.find("#palleon-elements-wrap li").show(), s.find("#palleon-element-search-icon").html("search"), s.find("#palleon-element-search-icon").removeClass("cancel")) : (s.find("#palleon-element-search-icon").html("clear"), s.find("#palleon-element-search-icon").addClass("cancel"), function(e) {
                e = e.toLowerCase().replace(" ", "-"), s.find("#palleon-elements-wrap li").hide().filter('[data-keyword*="' + e + '"]').show()
            }(a), 0 === s.find("#palleon-elements-wrap li:visible").length && s.find("#palleon-noelements").show())
        }), s.find("#palleon-element-search-icon").on("click", function() {
            e(this).hasClass("cancel") && (e(this).removeClass("cancel"), e(this).html("search"), s.find("#palleon-element-search").val(""), s.find("#palleon-elements-wrap li").show(), s.find("#palleon-noelements").hide())
        }), s.find(".palleon-elements-grid").on("click", ".palleon-element > *:first-child", function() {
            var a = Re()[1] / 2,
                t = Re()[0] / 2,
                n = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            n && (a = n.top, t = n.left);
            var l = e(this).parent(),
                i = l.data("elsource");
            if ("palleon-icons-grid" == l.parent().attr("id")) {
                var o = s.find("#palleon-icon-style").val();
                i = l.data("elsource") + "/" + o + "/24px.svg"
            }
            var r = l.data("loader");
            "yes" == r && s.find("#palleon-canvas-loader").css("display", "flex"), s.find(".palleon-elements-grid .palleon-element").removeClass("active"), l.addClass("active"), fabric.loadSVGFromURL(i, function(e, l) {
                var i = fabric.util.groupSVGElements(e, l);
                i.set("originX", "center"), i.set("originY", "center"), i.set("left", t), i.set("top", a), pe(i) ? (i.set("objectType", "element"), j.fire("palleon:history", {
                    type: "element",
                    text: palleonParams.added
                })) : (i.set("objectType", "customSVG"), j.fire("palleon:history", {
                    type: "customSVG",
                    text: palleonParams.added
                })), i.set("gradientFill", "none"), j.add(i), n ? (i.scaleToWidth(.5 * n.width * j.getZoom()), i.isContainedWithinObject(n) || i.scaleToHeight(.5 * n.height * j.getZoom())) : (i.scaleToWidth(Re()[0] / 8), i.isPartiallyOnScreen() && i.scaleToHeight(Re()[1] / 8)), j.setActiveObject(i), j.requestRenderAll(), "yes" == r && s.find("#palleon-canvas-loader").hide()
            }, function() {}, {
                crossOrigin: "anonymous"
            })
        }), s.find("#palleon-element-upload").on("change", function(e) {
            var a = new FileReader,
                t = "";
            a.onload = function(e) {
                t = a.result, fabric.loadSVGFromURL(t, function(e, a) {
                    var t = fabric.util.groupSVGElements(e, a),
                        n = j.getObjects().filter(e => "printarea" == e.objectType)[0];
                    t.set("originX", "center"), t.set("originY", "center"), t.set("left", Re()[0] / 2), t.set("top", Re()[1] / 2), pe(t) ? (t.set("objectType", "element"), j.fire("palleon:history", {
                        type: "element",
                        text: palleonParams.added
                    })) : (t.set("objectType", "customSVG"), j.fire("palleon:history", {
                        type: "customSVG",
                        text: palleonParams.added
                    })), j.add(t), n ? (t.scaleToWidth(.8 * n.width * j.getZoom()), t.isContainedWithinObject(n) || t.scaleToHeight(.8 * n.height * j.getZoom())) : (t.scaleToWidth(Re()[0] / 2), t.isPartiallyOnScreen() && t.scaleToHeight(Re()[1] / 2)), j.setActiveObject(t), j.requestRenderAll()
                }, function() {}, {
                    crossOrigin: "anonymous"
                })
            }, a.readAsDataURL(this.files[0])
        }), s.find("#palleon-element-color").bind("change", function() {
            var a = e(this).val(),
                t = j.getActiveObject();
            if ("" != t.fill && t.set("fill", a), t._objects)
                for (var n = 0; n < t._objects.length; n++) "" != t._objects[n].fill && t._objects[n].set({
                    fill: a
                });
            j.requestRenderAll(), j.fire("palleon:history", {
                type: "element",
                text: palleonParams.edited
            })
        }), s.find("#element-flip-horizontal").on("click", function() {
            j.getActiveObject().toggle("flipX"), j.requestRenderAll(), j.fire("palleon:history", {
                type: "element",
                text: palleonParams.edited
            })
        }), s.find("#element-flip-vertical").on("click", function() {
            j.getActiveObject().toggle("flipY"), j.requestRenderAll(), j.fire("palleon:history", {
                type: "element",
                text: palleonParams.edited
            })
        }), s.find("#palleon-custom-element-options input[type=range]").bind("input click", function() {
            var a = e(this).val();
            "element-skew-x" == e(this).attr("id") ? j.getActiveObject().set("skewX", parseInt(a)) : "element-skew-y" == e(this).attr("id") ? j.getActiveObject().set("skewY", parseInt(a)) : "element-rotate" == e(this).attr("id") ? j.getActiveObject().set("angle", parseInt(a)) : "element-opacity" == e(this).attr("id") && j.getActiveObject().set("opacity", parseFloat(a)), j.requestRenderAll()
        }), s.find("#palleon-custom-element-options input[type=range]").bind("change", function() {
            j.fire("palleon:history", {
                type: "element",
                text: palleonParams.edited
            })
        }), s.find(".palleon-grid").on("click", ".element-favorite button.star", function() {
            var a = e(this),
                t = a.data("elementid"),
                n = "add";
            a.hasClass("favorited") ? (s.find('*[data-elementid="' + t + '"]').removeClass("favorited"), n = "remove") : s.find('*[data-elementid="' + t + '"]').addClass("favorited");
            var l = {
                action: "favElement",
                nonce: palleonParams.nonce,
                elementid: t,
                mode: n
            };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: l,
                type: "POST",
                success: function(a) {
                    if ("add" == n ? (toastr.success(palleonParams.favorited, palleonParams.success), s.find('*[data-elementid="' + t + '"]').html('<span class="material-icons">star</span>')) : (toastr.success(palleonParams.unfavorited, palleonParams.success), s.find('*[data-elementid="' + t + '"]').html('<span class="material-icons">star_border</span>')), a) {
                        s.find("#palleon-my-favorites > div").html(a), z.update();
                        var l = e("#palleon-my-favorites").find(".palleon-element").length;
                        s.find("#elements-favorites-count").html(l)
                    }
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), s.find("#palleon-customsvg-upload").on("change", ".customsvg-color", function() {
            var a = e(this).val(),
                t = e(this).attr("data-color"),
                n = j.getActiveObject();
            if (n._objects) {
                for (var l = 0; l < n._objects.length; l++) n._objects[l].fill == t && n._objects[l].set({
                    fill: a
                });
                e(this).attr("data-color", a)
            }
            j.requestRenderAll(), j.fire("palleon:history", {
                type: "element",
                text: palleonParams.edited
            })
        }), s.find("#customsvg-flip-horizontal").on("click", function() {
            j.getActiveObject().toggle("flipX"), j.requestRenderAll(), j.fire("palleon:history", {
                type: "customSVG",
                text: palleonParams.edited
            })
        }), s.find("#customsvg-flip-vertical").on("click", function() {
            j.getActiveObject().toggle("flipY"), j.requestRenderAll(), j.fire("palleon:history", {
                type: "customSVG",
                text: palleonParams.edited
            })
        }), s.find("#palleon-custom-svg-options input[type=range]").bind("input click", function() {
            var a = e(this).val();
            "customsvg-skew-x" == e(this).attr("id") ? j.getActiveObject().set("skewX", parseInt(a)) : "customsvg-skew-y" == e(this).attr("id") ? j.getActiveObject().set("skewY", parseInt(a)) : "customsvg-rotate" == e(this).attr("id") ? j.getActiveObject().set("angle", parseInt(a)) : "customsvg-opacity" == e(this).attr("id") && j.getActiveObject().set("opacity", parseFloat(a)), j.requestRenderAll()
        }), s.find("#palleon-custom-svg-options input[type=range]").bind("change", function() {
            j.fire("palleon:history", {
                type: "customSVG",
                text: palleonParams.edited
            })
        });
        s.find("#palleon-icon-search").on("keyup input", function() {
            s.find("#palleon-noicons").hide();
            var a = e(this).val().toLowerCase().replace(/\s/g, " ");
            "" == a || a.length < 1 ? (s.find("#palleon-icons-grid .palleon-element").css("display", "flex"), s.find("#palleon-icon-search-icon").html("search"), s.find("#palleon-icon-search-icon").removeClass("cancel")) : (s.find("#palleon-icon-search-icon").html("clear"), s.find("#palleon-icon-search-icon").addClass("cancel"), function(e) {
                s.find("#palleon-icons-grid .palleon-element").css("display", "none").filter('[title*="' + e + '"]').css("display", "flex")
            }(a), 0 === s.find("#palleon-icons-grid .palleon-element:visible").length && s.find("#palleon-noicons").show())
        }), s.find("#palleon-icon-search-icon").on("click", function() {
            e(this).hasClass("cancel") && (e(this).removeClass("cancel"), e(this).html("search"), s.find("#palleon-icon-search").val(""), s.find("#palleon-icons-grid .palleon-element").css("display", "flex"), s.find("#palleon-noicons").hide())
        }), s.find("#palleon-apps-menu > .palleon-apps-menu-item").on("click", function() {
            var a = e(this).attr("data-id");
            s.find("#palleon-apps-content > div").addClass("d-none"), s.find(a).removeClass("d-none"), s.find("#palleon-apps-menu").hide()
        }), s.find(".palleon-close-app").on("click", function() {
            s.find("#palleon-apps-content > div").addClass("d-none"), s.find("#palleon-apps-menu").show()
        }), s.find(".palleon-app-download").on("click", function() {
            var a = e(this).attr("data-id"),
                t = s.find("#palleon-" + a + "-preview")[0],
                n = (new XMLSerializer).serializeToString(t),
                l = document.createElement("a"),
                i = new Blob([n], {
                    type: "text/plain"
                });
            l.href = URL.createObjectURL(i), l.download = a + ".svg", l.click()
        }), s.find(".palleon-app-download-png").on("click", function() {
            var a = e(this).attr("data-id"),
                t = H(s.find("#palleon-" + a + "-preview").find("img").attr("src")),
                n = URL.createObjectURL(t),
                l = document.createElement("a");
            l.download = a + ".png", l.href = n, l.click()
        }), s.find(".palleon-app-select").on("click", function() {
            var a = e(this),
                t = e(this).attr("data-id"),
                n = s.find("#palleon-" + t + "-preview")[0],
                l = Re()[1] / 2,
                i = Re()[0] / 2,
                o = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            o && (l = o.top, i = o.left);
            var r = (new XMLSerializer).serializeToString(n);
            fabric.loadSVGFromString(r, function(e, t) {
                var n = fabric.util.groupSVGElements(e, t);
                n.set("originX", "center"), n.set("originY", "center"), n.set("left", i), n.set("top", l), a.hasClass("element") ? n.set("objectType", "element") : n.set("objectType", "customSVG"), n.set("gradientFill", "none"), n.controls = {
                    ...fabric.Rect.prototype.controls,
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    })
                }, j.add(n), o ? (n.scaleToWidth(.5 * o.width * j.getZoom()), n.isContainedWithinObject(o) || n.scaleToHeight(.5 * o.height * j.getZoom())) : (n.scaleToWidth(Re()[0] / 8), n.isPartiallyOnScreen() && n.scaleToHeight(Re()[1] / 8)), j.setActiveObject(n), j.requestRenderAll()
            })
        }), s.find(".palleon-app-select-png").on("click", function() {
            var a = e(this).attr("data-id"),
                t = s.find("#palleon-" + a + "-preview").find("img").attr("src"),
                n = new Image,
                l = Re()[1] / 2,
                i = Re()[0] / 2,
                o = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            o && (l = o.top, i = o.left), n.src = t, n.onload = function() {
                var e = new fabric.Image(n, {
                    objectType: "image",
                    objectCaching: !0,
                    roundedCorders: 0,
                    stroke: "#fff",
                    strokeWidth: 0,
                    top: l,
                    left: i,
                    originX: "center",
                    originY: "center"
                });
                e.set({
                    ogWidth: e.get("width"),
                    ogHeight: e.get("height")
                }), j.add(e), o ? (e.scaleToWidth(.8 * o.width * j.getZoom()), e.isContainedWithinObject(o) || e.scaleToHeight(.8 * o.height * j.getZoom())) : (e.scaleToWidth(Re()[0] / 4), e.isPartiallyOnScreen() && e.scaleToHeight(Re()[1] / 4)), j.setActiveObject(e), j.requestRenderAll(), s.find("#palleon-canvas-loader").hide(), j.fire("palleon:history", {
                    type: "image",
                    text: palleonParams.added
                })
            }
        });
        var We = {},
            Ee = "";

        function ze() {
            var a = s.find("#palleon-canvas-img").attr("src");
            s.find("#palleon-color-thief-preview img").attr("src", a);
            const t = new ColorThief,
                n = s.find("#palleon-color-thief-img")[0];

            function l(a) {
                var n = "",
                    l = [],
                    i = "",
                    o = '<div class="notice notice-warning">' + palleonParams.nocolor + "</div>";
                ! function(e) {
                    const a = document.createElement("canvas"),
                        t = a.getContext("2d");
                    a.width = e.width, a.height = e.height, t.drawImage(e, 0, 0);
                    const n = t.getImageData(0, 0, e.width, e.height).data;
                    for (let e = 0; e < n.length; e += 4)
                        if (0 !== n[e] || 0 !== n[e + 1] || 0 !== n[e + 2] || 0 !== n[e + 3]) return !1;
                    return !0
                }(a) ? (s.find("#palleon-color-thief-preview").show(), o = '<div class="palleon-control-wrap label-block control-text-color"><div class="palleon-control"><input id="color-thief-0" type="text" data-color="' + (n = "rgb(" + t.getColor(a).toString(16) + ")") + '" class="color-thief palleon-colorpicker disallow-empty" autocomplete="off" value="' + n + '" readonly /></div></div>', l = t.getPalette(a), e.each(l, function(e, a) {
                    var t = e + 1,
                        n = "rgb(" + a.toString(16) + ")";
                    i += '<div class="palleon-control-wrap label-block control-text-color"><div class="palleon-control"><input id="color-thief-' + t + '" type="text" data-color="' + n + '" class="color-thief palleon-colorpicker disallow-empty" autocomplete="off" value="' + n + '" readonly /></div></div>'
                })) : s.find("#palleon-color-thief-preview").hide(), "" == i && (i = '<div class="notice notice-warning">' + palleonParams.nocolor + "</div>"), s.find("#palleon-color-thief-dominant").html(o), s.find("#palleon-color-thief-scheme").html(i), s.find(".color-thief").spectrum({
                    showPalette: !1,
                    showAlpha: !1,
                    showButtons: !1,
                    allowEmpty: !1
                })
            }
            n.complete ? l(n) : n.addEventListener("load", function() {
                l(n)
            })
        }

        function Be(e, a, t, n, l) {
            var i = (0, window.trianglify)({
                width: e,
                height: a,
                cellSize: t,
                variance: n,
                xColors: l,
                yColors: "match",
                fill: !0
            }).toCanvas();
            i = i.toDataURL({
                format: "png",
                enableRetinaScaling: !1
            }), s.find("#palleon-trianglify-preview").html('<img src="' + i + '" />')
        }

        function De() {
            return kjua({
                text: s.find("#palleon-qrcode-text").val(),
                render: "svg",
                size: 300,
                fill: s.find("#palleon-qrcode-fill").val(),
                back: s.find("#palleon-qrcode-back").val(),
                rounded: s.find("#palleon-qrcode-rounded").val(),
                mode: "label",
                label: s.find("#palleon-qrcode-label").val(),
                fontname: "sans",
                fontcolor: s.find("#palleon-qrcode-label-color").val(),
                mSize: s.find("#palleon-qrcode-label-size").val(),
                mPosX: s.find("#palleon-qrcode-label-position-x").val(),
                mPosY: s.find("#palleon-qrcode-label-position-y").val()
            })
        }

        function Le() {
            var a = !1,
                t = "";
            s.find("#palleon-barcode-show-text").is(":checked") && (a = !0), s.find("#palleon-barcode-text-bold").hasClass("active") && (t += "bold"), s.find("#palleon-barcode-text-italic").hasClass("active") && (t += " italic"), JsBarcode("#palleon-barcode-preview", s.find("#palleon-barcode-text").val(), {
                format: s.find("#palleon-barcode-format").val(),
                width: parseInt(s.find("#palleon-barcode-bar-width").val()),
                height: parseInt(s.find("#palleon-barcode-height").val()),
                displayValue: a,
                fontOptions: t,
                font: s.find("#palleon-barcode-font-family").val(),
                textAlign: e("#palleon-barcode-text-options").find(".format-align.active").data("align"),
                textMargin: parseInt(s.find("#palleon-barcode-text-margin").val()),
                fontSize: parseInt(s.find("#palleon-barcode-font-size").val()),
                background: s.find("#palleon-barcode-back").val(),
                lineColor: s.find("#palleon-barcode-line").val(),
                margin: parseInt(s.find("#palleon-barcode-margin").val()),
                valid: function(a) {
                    a ? (e("#palleon-barcode-wrap").show(), e("#palleon-barcode-notice").addClass("d-none"), s.find("#palleon-generate-barcode").prop("disabled", !1)) : (e("#palleon-barcode-wrap").hide(), e("#palleon-barcode-notice").removeClass("d-none"), s.find("#palleon-generate-barcode").prop("disabled", !0))
                }
            })
        }

        function He(a, t) {
            e("#tm-cursor-1").remove(), s.find("#palleon-canvas-wrap").tmpointer({
                id: 1,
                native_cursor: "enable",
                cursorSize: a,
                cursorColor: t
            })
        }
        s.find("#palleon-btn-apps").one("click", function() {
            We = {
                YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
                YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
                GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
                BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
                PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
                PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
                BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
                RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
                PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
                OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
                YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
                YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
                Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
                Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
                Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
                Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
                Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
                Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
                PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
                BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
                PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
                PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
                RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
                RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
                RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
                Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
                RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"]
            };
            var a = '<div class="palleon-colorbrewer-item random active" data-id="random"><span class="material-icons">shuffle</span></div>';
            e.each(We, function(e, t) {
                a += '<div class="palleon-colorbrewer-item" data-id="' + e + '">';
                for (var n = 0; n < t.length; n++) a += '<div style="background: ' + t[n] + ';"></div>';
                a += "</div>"
            }), s.find("#palleon-colorbrewer").html(a), e.getJSON(palleonParams.baseURL + "json/brands.json", function(a) {
                Ee = a;
                for (var t = 0; t < a.length; t++) "envato" == a[t].id ? s.find("#palleon-brands-list").append(e("<option></option>").attr("value", a[t].id).attr("selected", "selected").text(a[t].title)) : s.find("#palleon-brands-list").append(e("<option></option>").attr("value", a[t].id).text(a[t].title));
                s.find("#palleon-brands-list").trigger("change")
            }), e.getJSON(palleonParams.baseURL + "json/crypto.json", function(a) {
                for (var t = 0; t < a.length; t++) "BTC" == a[t].symbol ? s.find("#palleon-crypto-list").append(e("<option></option>").attr("value", a[t].symbol).attr("selected", "selected").text(a[t].name)) : s.find("#palleon-crypto-list").append(e("<option></option>").attr("value", a[t].symbol).text(a[t].name));
                s.find("#palleon-crypto-list").trigger("change")
            }), e.getJSON(palleonParams.baseURL + "json/countries.json", function(a) {
                for (var t = 0; t < a.length; t++) s.find("#palleon-flags-list").append(e("<option></option>").attr("value", a[t].code).text(a[t].name));
                s.find("#palleon-flags-list").trigger("change")
            })
        }), s.find("#palleon-apps-menu-color-thief").on("click", function() {
            ze()
        }), s.find("#palleon-apps-menu-trianglify").one("click", function() {
            Be(1440, 900, 75, .5, "random")
        }), s.find("#palleon-trianglify-app").on("click", ".palleon-colorbrewer-item", function() {
            if (e(this).hasClass("active")) {
                if (!e(this).hasClass("random")) return;
                Be(parseInt(s.find("#palleon-trianglify-width").val()), parseInt(s.find("#palleon-trianglify-height").val()), s.find("#palleon-trianglify-cell-size").val(), s.find("#palleon-trianglify-variance").val(), "random")
            } else {
                s.find(".palleon-colorbrewer-item").removeClass("active"), e(this).addClass("active"), Be(parseInt(s.find("#palleon-trianglify-width").val()), parseInt(s.find("#palleon-trianglify-height").val()), s.find("#palleon-trianglify-cell-size").val(), s.find("#palleon-trianglify-variance").val(), e(this).attr("data-id"))
            }
        }), s.find("#palleon-trianglify-width").on("change", function() {
            Be(parseInt(e(this).val()), parseInt(s.find("#palleon-trianglify-height").val()), s.find("#palleon-trianglify-cell-size").val(), s.find("#palleon-trianglify-variance").val(), s.find(".palleon-colorbrewer-item.active").attr("data-id"))
        }), s.find("#palleon-trianglify-height").on("change", function() {
            var a = parseInt(e(this).val());
            Be(parseInt(s.find("#palleon-trianglify-width").val()), a, s.find("#palleon-trianglify-cell-size").val(), s.find("#palleon-trianglify-variance").val(), s.find(".palleon-colorbrewer-item.active").attr("data-id"))
        }), s.find("#palleon-trianglify-cell-size").on("change", function() {
            var a = parseInt(s.find("#palleon-trianglify-height").val());
            Be(parseInt(s.find("#palleon-trianglify-width").val()), a, e(this).val(), s.find("#palleon-trianglify-variance").val(), s.find(".palleon-colorbrewer-item.active").attr("data-id"))
        }), s.find("#palleon-trianglify-variance").on("change", function() {
            var a = parseInt(s.find("#palleon-trianglify-height").val());
            Be(parseInt(s.find("#palleon-trianglify-width").val()), a, s.find("#palleon-trianglify-cell-size").val(), e(this).val(), s.find(".palleon-colorbrewer-item.active").attr("data-id"))
        }), s.find("#palleon-brands-list").on("change", function() {
            for (var a = e(this).val(), t = 0; t < Ee.length; t++)
                if (Ee[t].id == a) {
                    var n = "https://cdn.jsdelivr.net/npm/simple-icons@v10/icons/" + Ee[t].id + ".svg";
                    return void e.get(n, function(a) {
                        var n = e(a).find("svg");
                        n.removeAttr("xmlns:a"), s.find("#palleon-brands-preview > *").replaceWith(n), s.find("#palleon-brands-preview").html(s.find("#palleon-brands-preview").html().replace(/^.{4}/g, '<svg fill="#' + Ee[t].hex + '"'))
                    }, "xml")
                }
        }), s.find("#palleon-crypto-list").on("change", function() {
            var a = e(this).val().toLowerCase(),
                t = palleonParams.sourceURL + "crypto/" + a + ".svg";
            e.get(t, function(a) {
                var t = e(a).find("svg");
                t.removeAttr("xmlns:a"), s.find("#palleon-crypto-preview > *").replaceWith(t)
            }, "xml")
        }), s.find("#palleon-flags-style").on("change", function() {
            var a = e(this).val(),
                t = s.find("#palleon-flags-list").val().toLowerCase(),
                n = palleonParams.sourceURL + "flags/" + a + "/" + t + ".svg";
            e.get(n, function(a) {
                var t = e(a).find("svg");
                t.removeAttr("xmlns:a"), s.find("#palleon-flags-preview > *").replaceWith(t)
            }, "xml")
        }), s.find("#palleon-flags-list").on("change", function() {
            var a = e(this).val().toLowerCase(),
                t = s.find("#palleon-flags-style").val(),
                n = palleonParams.sourceURL + "flags/" + t + "/" + a + ".svg";
            e.get(n, function(a) {
                var t = e(a).find("svg");
                t.removeAttr("xmlns:a"), s.find("#palleon-flags-preview > *").replaceWith(t)
            }, "xml")
        }), s.find("#palleon-generate-multiavatar").on("click", function() {
            var e = (new Date).getTime(),
                a = multiavatar(e);
            s.find("#palleon-multiavatar-name").val(e), s.find("#palleon-multiavatar-preview").html(a)
        }), s.find("#palleon-apps-menu-multiavatar").on("click", function() {
            s.find("#palleon-generate-multiavatar").trigger("click")
        }), s.find("#palleon-multiavatar-name").on("input paste", function() {
            var a = "John Doe";
            0 !== e(this).val().length ? a = e(this).val() : e(this).val(a);
            var t = multiavatar(a);
            s.find("#palleon-multiavatar-preview").html(t)
        }), s.find("#palleon-generate-qr-code").on("click", function() {
            var e = kjua({
                    text: s.find("#palleon-qrcode-text").val(),
                    render: "svg",
                    size: 300,
                    fill: s.find("#palleon-qrcode-fill").val(),
                    back: s.find("#palleon-qrcode-back").val(),
                    rounded: s.find("#palleon-qrcode-rounded").val(),
                    mode: "label",
                    label: s.find("#palleon-qrcode-label").val(),
                    fontname: "sans",
                    fontcolor: s.find("#palleon-qrcode-label-color").val(),
                    mSize: s.find("#palleon-qrcode-label-size").val(),
                    mPosX: s.find("#palleon-qrcode-label-position-x").val(),
                    mPosY: s.find("#palleon-qrcode-label-position-y").val()
                }),
                a = Re()[1] / 2,
                t = Re()[0] / 2,
                n = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            n && (a = n.top, t = n.left);
            var l = (new XMLSerializer).serializeToString(e);
            fabric.loadSVGFromString(l, function(e, l) {
                var i = fabric.util.groupSVGElements(e, l);
                i.set("originX", "center"), i.set("originY", "center"), i.set("left", t), i.set("top", a), i.set("objectType", "app"), i.set("gradientFill", "none"), i.controls = {
                    ...fabric.Rect.prototype.controls,
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    })
                }, j.add(i), n ? (i.scaleToWidth(.5 * n.width * j.getZoom()), i.isContainedWithinObject(n) || i.scaleToHeight(.5 * n.height * j.getZoom())) : (i.scaleToWidth(Re()[0] / 8), i.isPartiallyOnScreen() && i.scaleToHeight(Re()[1] / 8)), j.setActiveObject(i), j.requestRenderAll()
            })
        }), s.find("#palleon-apps-menu-qrcode").one("click", function() {
            s.find("#qrcode-preview").html(De())
        }), s.find('#palleon-qrcode-settings input[type="text"]').on("input", function() {
            var e = De();
            s.find("#qrcode-preview").html(e)
        }), s.find("#palleon-qrcode-settings .palleon-colorpicker").bind("change", function() {
            var e = De();
            s.find("#qrcode-preview").html(e)
        }), s.find("#palleon-qrcode-settings input[type=range]").bind("input click", function() {
            var e = De();
            s.find("#qrcode-preview").html(e)
        }), s.find("#palleon-generate-barcode").on("click", function() {
            var e = document.getElementById("palleon-barcode-preview"),
                a = Re()[1] / 2,
                t = Re()[0] / 2,
                n = j.getObjects().filter(e => "printarea" == e.objectType)[0];
            n && (a = n.top, t = n.left);
            var l = (new XMLSerializer).serializeToString(e);
            fabric.loadSVGFromString(l, function(e, l) {
                var i = fabric.util.groupSVGElements(e, l);
                i.set("originX", "center"), i.set("originY", "center"), i.set("left", t), i.set("top", a), i.set("objectType", "app"), i.set("gradientFill", "none"), i.controls = {
                    ...fabric.Rect.prototype.controls,
                    ml: new fabric.Control({
                        visible: !1
                    }),
                    mb: new fabric.Control({
                        visible: !1
                    }),
                    mr: new fabric.Control({
                        visible: !1
                    }),
                    mt: new fabric.Control({
                        visible: !1
                    })
                }, j.add(i), n ? (i.scaleToWidth(.5 * n.width * j.getZoom()), i.isContainedWithinObject(n) || i.scaleToHeight(.5 * n.height * j.getZoom())) : (i.scaleToWidth(Re()[0] / 4), i.isPartiallyOnScreen() && i.scaleToHeight(Re()[1] / 4)), j.setActiveObject(i), j.requestRenderAll()
            })
        }), s.find("#palleon-apps-menu-barcode").one("click", function() {
            s.find("#barcode-preview").html(Le())
        }), s.find('#palleon-barcode-settings input[type="text"]').on("input", function() {
            Le()
        }), s.find("#palleon-barcode-settings .palleon-colorpicker").bind("change", function() {
            Le()
        }), s.find("#palleon-barcode-settings input[type=range]").bind("input click", function() {
            Le()
        }), s.find("#palleon-barcode-settings .format-style").on("click", function() {
            e(this).hasClass("active") ? e(this).removeClass("active") : e(this).addClass("active"), Le()
        }), s.find("#palleon-barcode-settings .format-align").on("click", function() {
            e(this).hasClass("active") || (s.find("#palleon-barcode-settings .format-align").removeClass("active"), e(this).addClass("active")), Le()
        }), s.find("#palleon-barcode-settings .palleon-select").bind("change", function() {
            if ("palleon-barcode-format" == e(this).attr("id")) {
                s.find("#palleon-barcode-text").val({
                    CODE128: "Example 1234",
                    CODE128A: "EXAMPLE",
                    CODE128B: "Example text",
                    CODE128C: "12345678",
                    EAN13: "1234567890128",
                    EAN8: "12345670",
                    UPC: "123456789999",
                    CODE39: "EXAMPLE TEXT",
                    ITF14: "10012345000017",
                    ITF: "123456",
                    MSI: "123456",
                    MSI10: "123456",
                    MSI11: "123456",
                    MSI1010: "123456",
                    MSI1110: "123456",
                    pharmacode: "1234"
                } [e(this).val()])
            }
            Le()
        }), s.find("#palleon-barcode-settings .palleon-toggle-checkbox").bind("change", function() {
            Le()
        }), s.find("#palleon-draw-btn").on("click", function() {
            e(this).hasClass("active") ? (e("#tm-cursor-1").remove(), s.find("#palleon-draw-settings").hide(), s.find("#palleon-top-bar, #palleon-right-col, #palleon-icon-menu, #palleon-toggle-left, #palleon-toggle-right, .palleon-content-bar").css("pointer-events", "auto"), e(this).removeClass("active"), j.isDrawingMode = !1, e(this).removeClass("danger"), e(this).addClass("primary"), e(this).html('<span class="material-icons">brush</span>' + palleonParams.startDrawing)) : (s.find("#palleon-draw-settings").show(), s.find("#palleon-top-bar, #palleon-right-col, #palleon-icon-menu, #palleon-toggle-left, #palleon-toggle-right, .palleon-content-bar").css("pointer-events", "none"), e(this).addClass("active"), s.find("#palleon-brush-select").trigger("change"), j.isDrawingMode = !0, e(this).removeClass("primary"), e(this).addClass("danger"), e(this).html('<span class="material-icons">close</span>' + palleonParams.stopDrawing))
        }), s.find("#palleon-brush-select").on("change", function() {
            var a = e(this).val();
            if ("erase" == a ? e("#palleon-brush-tip").hide() : e("#palleon-brush-tip").show(), "pencil" == a) {
                var t = new fabric.PencilBrush(j);
                j.freeDrawingBrush = t
            } else if ("circle" == a) {
                var n = new fabric.CircleBrush(j);
                j.freeDrawingBrush = n
            } else if ("spray" == a) {
                var l = new fabric.SprayBrush(j);
                j.freeDrawingBrush = l
            } else if ("hline" == a) {
                var i = new fabric.PatternBrush(j);
                j.freeDrawingBrush = i, i.getPatternSrc = function() {
                    var e = parseInt(s.find("#brush-pattern-width").val()),
                        a = e / 2,
                        t = fabric.document.createElement("canvas");
                    t.width = t.height = e;
                    var n = t.getContext("2d");
                    return n.strokeStyle = s.find("#brush-color").val(), n.lineWidth = a, n.beginPath(), n.moveTo(a, 0), n.lineTo(a, e), n.closePath(), n.stroke(), t
                }
            } else if ("vline" == a) {
                var o = new fabric.PatternBrush(j);
                j.freeDrawingBrush = o, o.getPatternSrc = function() {
                    var e = parseInt(s.find("#brush-pattern-width").val()),
                        a = e / 2,
                        t = fabric.document.createElement("canvas");
                    t.width = t.height = e;
                    var n = t.getContext("2d");
                    return n.strokeStyle = s.find("#brush-color").val(), n.lineWidth = a, n.beginPath(), n.moveTo(0, a), n.lineTo(e, a), n.closePath(), n.stroke(), t
                }
            } else if ("square" == a) {
                var r = new fabric.PatternBrush(j);
                j.freeDrawingBrush = r, r.getPatternSrc = function() {
                    var e = parseInt(s.find("#brush-pattern-width").val()),
                        a = parseInt(s.find("#brush-pattern-distance").val()),
                        t = fabric.document.createElement("canvas");
                    t.width = t.height = e + a;
                    var n = t.getContext("2d");
                    return n.fillStyle = s.find("#brush-color").val(), n.fillRect(0, 0, e, e), t
                }
            } else if ("erase" == a) {
                var d = new fabric.EraserBrush(j);
                j.freeDrawingBrush = d
            }(S = j.freeDrawingBrush).getPatternSrc && (S.source = S.getPatternSrc.call(S)), S.width = parseInt(s.find("#brush-width").val()), s.find("#palleon-brush-shadow").is(":checked") ? S.shadow = T : S.shadow = null, "erase" == a ? (s.find("#not-erase-brush").hide(), S.shadow = null, S.color = "#E91E63") : (j.freeDrawingBrush.inverted = !1, s.find("#not-erase-brush").show(), S.color = s.find("#brush-color").val()), He(S.width * j.getZoom(), S.color), "hline" == a || "vline" == a || "square" == a ? s.find("#palleon-brush-pattern-width").css("display", "flex") : s.find("#palleon-brush-pattern-width").css("display", "none"), "square" == a ? s.find("#palleon-brush-pattern-distance").css("display", "flex") : s.find("#palleon-brush-pattern-distance").css("display", "none")
        }), s.find("#palleon-brush-shadow").on("change", function() {
            T = new fabric.Shadow({
                color: s.find("#brush-shadow-color").val(),
                blur: s.find("#brush-shadow-width").val(),
                offsetX: s.find("#brush-shadow-shadow-offset-x").val(),
                offsetY: s.find("#brush-shadow-shadow-offset-y").val()
            }), e(this).is(":checked") ? S.shadow = T : S.shadow = null
        }), s.find("#palleon-draw-settings input[type=number]").bind("input paste keyup keydown", function() {
            "brush-width" == e(this).attr("id") ? (S.width = parseInt(e(this).val()), He(S.width * j.getZoom(), S.color)) : "brush-shadow-shadow-offset-x" == e(this).attr("id") ? T.offsetX = parseInt(e(this).val()) : "brush-shadow-shadow-offset-y" == e(this).attr("id") ? T.offsetY = parseInt(e(this).val()) : "brush-shadow-width" == e(this).attr("id") ? T.blur = parseInt(e(this).val()) : "brush-pattern-width" == e(this).attr("id") ? s.find("#palleon-brush-select").trigger("change") : "brush-pattern-distance" == e(this).attr("id") && s.find("#palleon-brush-select").trigger("change")
        }), s.find("#palleon-draw-settings .palleon-colorpicker").bind("change", function() {
            "brush-color" == e(this).attr("id") ? (S.color = e(this).val(), He(S.width * j.getZoom(), S.color), s.find("#palleon-brush-select").trigger("change")) : "brush-shadow-color" == e(this).attr("id") && (T.color = e(this).val())
        });

        document.onkeydown = function(a) {
            var t = j.getActiveObject();
            switch (a.keyCode) {
                case 38:
                    t && (t.top -= 1, j.requestRenderAll());
                    break;
                case 40:
                    t && (t.top += 1, j.requestRenderAll());
                    break;
                case 37:
                    t && (t.left -= 1, j.requestRenderAll());
                    break;
                case 39:
                    t && (t.left += 1, j.requestRenderAll());
                    break;
                case 8:
                    if (t && !e("input").is(":focus") && !e("textarea").is(":focus")) {
                        if ("activeSelection" === t.type) e.each(t._objects, function(e, a) {
                            s.find("#palleon-layers #" + a.id).find("a.delete-layer").trigger("click")
                        }), j.discardActiveObject();
                        else s.find("#palleon-layers #" + t.id).find("a.delete-layer").trigger("click");
                        j.requestRenderAll()
                    }
                    break;
                case 71: // G key for grouping
                    if (a.ctrlKey && !a.shiftKey && t && "activeSelection" === t.type && !e("input").is(":focus") && !e("textarea").is(":focus")) {
                        a.preventDefault();
                        groupSelectedObjects();
                    } else if (a.ctrlKey && a.shiftKey && t && "group" === t.type && !e("input").is(":focus") && !e("textarea").is(":focus")) {
                        a.preventDefault();
                        ungroupSelectedObjects();
                    }
            }
        }, s.find("#custom-theme").on("change", function() {
            var a = e(this).val(),
                t = palleonParams.baseURL + "css/" + a + palleonParams.suffix + ".css";
            e("#palleon-theme-link").attr("href", t), s.removeClass("light-theme"), s.removeClass("dark-theme"), s.addClass(a + "-theme")
        }), s.find("#custom-font-size").on("input", function() {
            e("html").css("font-size", e(this).val() + "px")
        }), s.find("#custom-image-background").on("change", function() {
            var a = e(this).val();
            s.find("#palleon-canvas-color").spectrum("set", a), "" == a ? (j.backgroundColor = "transparent", j.requestRenderAll()) : (j.backgroundColor = a, j.requestRenderAll())
        }), s.find("#ruler-guide-color").on("change", function() {
            var a = e(this).val();
            "" != a && (s.find(".guide.h, .guide.v").css("border-color", a), initAligningGuidelines(j))
        }), s.find("#ruler-guide-size").on("input", function() {
            var a = e(this).val();
            s.find(".guide.h, .guide.v").css("border-width", a + "px"), initAligningGuidelines(j)
        }), s.find("#palleon-preferences-save").on("click", function() {
            var a = e(this),
                t = {},
                n = [],
                l = [];
            s.find("#palleon-preferences .preference").each(function(a, t) {
                n.push(e(this).attr("id")), l.push(e(this).val())
            });
            for (let e = 0; e < n.length; e++) t[n[e]] = l[e];
            var i = {
                action: "savePreferences",
                nonce: palleonParams.nonce,
                preferences: JSON.stringify(t)
            };
            e.ajax({
                url: palleonParams.ajaxurl,
                data: i,
                type: "POST",
                beforeSend: function() {
                    a.prop("disabled", !0)
                },
                success: function() {
                    toastr.success(palleonParams.settingsaved, palleonParams.success)
                },
                complete: function() {
                    a.prop("disabled", !1)
                },
                error: function(e, a, t) {
                    e.status && 400 == e.status ? toastr.error(e.responseText, palleonParams.error) : toastr.error(palleonParams.wrong, palleonParams.error)
                }
            })
        }), initAligningGuidelines(j), e(window).on("resize", function() {
            ye()
        }), c.customFunctions.call(this, s, j, z, toastr)
    }, new FontFaceObserver("Material Icons").load(null, 1e4).then(function() {
        e("#palleon").find("#palleon-main-loader").fadeOut(200), setTimeout(function() {
            e("#palleon").find("#palleon-main-loader").remove()
        }, 300)
    }).catch(function(a) {
        console.log(a), e("#palleon").find("#palleon-main-loader").remove()
    })
}(jQuery);