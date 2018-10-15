module WebpackHelper
  DEFAULT_JS_OPTIONS = { defer: "defer", crossorigin: "anonymous", "data-turbolinks-track".to_sym => false }.freeze

  def include_webpack_bundle_js(bundle_name, **js_options)
    js_options.reverse_merge!(DEFAULT_JS_OPTIONS)
    javascript_pack_tag(bundle_name, **js_options)
  end

  def include_webpack_bundle_css(bundle_name)
    stylesheet_pack_tag(bundle_name, media: "all")
  end

  def include_webpack_bundle(bundle_name, **js_options)
    include_webpack_bundle_js(bundle_name, **js_options) + include_webpack_bundle_css(bundle_name)
  end
end