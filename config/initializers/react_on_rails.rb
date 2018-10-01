# frozen_string_literal: true

# See https://github.com/shakacode/react_on_rails/blob/master/docs/basics/configuration.md
# for many more options.

ReactOnRails.configure do |config|
  # `trace`: General debugging flag.
  # The default is true for development, off otherwise.
  # With true, you get detailed logs of rendering and stack traces if you call setTimout,
  # setInterval, clearTimout when server rendering.
  config.trace = Rails.env.development?

  # Configure if default DOM IDs have a random value or are fixed.
  # false ==> Sets the dom id to "#{react_component_name}-react-component"
  # true ==> Adds "-#{SecureRandom.uuid}" to that ID
  # If you might use multiple instances of the same React component on a Rails page, then
  # it is convenient to set this to true or else you have to either manually set the ids to
  # avoid collisions. Most newer apps will have only one instance of a component on a page,
  # so this should be false in most cases.
  # This value can be overrident for a given call to react_component
  config.random_dom_id = false # default is true

  config.node_modules_location = "client"

  # This configures the script to run to build the production assets by webpack. Set this to nil
  # if you don't want react_on_rails building this file for you.
  config.build_production_command = "yarn start build.prod"

  ################################################################################
  ################################################################################
  # TEST CONFIGURATION OPTIONS
  # Below options are used with the use of this test helper:
  # ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  ################################################################################

  # If you are using this in your spec_helper.rb (or rails_helper.rb):
  #
  # ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)
  #
  # with rspec then this controls what yarn command is run
  # to automatically refresh your webpack assets on every test run.
  #
  config.build_test_command = "yarn start build.rspec"

  # Directory where your generated assets go. All generated assets must go to the same directory.
  # If you are using webpacker, this value will come from your config/webpacker.yml file.
  # This is the default in webpacker.yml:
  #   public_output_path: packs-test
  # which means files in /public/packs-test
  #
  # Alternately, you may configure this. It is relative to your Rails root directory.
  # A custom, non-webpacker, config might use something like:
  #
  # config.generated_assets_dir = File.join(%w[public webpack], Rails.env)
  # This setting should not be used if using webpacker.

  # The test helper needs to know where your JavaScript files exist. The default is configured
  # by your config/webpacker.yml soure_path:
  # source_path: client/app/javascript
  #
  # Directory where your generated assets go. All generated assets must go to the same directory.
  # If you are using webpacker, this value will come from your config/webpacker.yml file.
  # This is the default in webpacker.yml:
  #   public_output_path: packs-test
  # which means files in /public/packs-test

  # Define the files we need to check for webpack compilation when running tests.
  # The default is `%w( manifest.json )` as will be sufficient for most webpacker builds.
  # However, if you are generated a server bundle that is NOT hashed (present in manifest.json),
  # then include the file in this list like this:
  config.webpack_generated_files = %w[server-bundle.js manifest.json]

  ################################################################################
  ################################################################################
  # SERVER RENDERING OPTIONS
  ################################################################################
  # This is the file used for server rendering of React when using `(prerender: true)`
  # If you are never using server rendering, you should set this to "".
  # Note, there is only one server bundle, unlike JavaScript where you want to minimize the size
  # of the JS sent to the client. For the server rendering, React on Rails creates a pool of
  # JavaScript execution instances which should handle any component requested.
  #
  # While you may configure this to be the same as your client bundle file, this file is typically
  # different. Note, be sure to include the exact file name with the ".js" if you are not hashing this file.
  # If you are hashing this file (supposing you are using the same file for client rendering), then
  #
  # you should include a name that matches your bundle name in your webpack config.
  config.server_bundle_js_file = "server-bundle.js" # keep in sync with `nps clear.serverBundle`

  # If set to true, this forces Rails to reload the server bundle if it is modified
  config.development_mode = Rails.env.development?

  # For server rendering. This can be set to false so that server side messages are discarded.
  # Default is true. Be cautious about turning this off.
  config.replay_console = true

  # Default is true. Logs server rendering messages to Rails.logger.info
  config.logging_on_server = true

  config.raise_on_prerender_error = false # change to true to raise exception on server if the JS code throws

  # Server rendering only (not for render_component helper)
  # You can configure your pool of JS virtual machines and specify where it should load code:
  # On MRI, use `therubyracer` for the best performance
  # (see [discussion](https://github.com/reactjs/react-rails/pull/290))
  # On MRI, you'll get a deadlock with `pool_size` > 1
  # If you're using JRuby, you can increase `pool_size` to have real multi-threaded rendering.
  config.server_renderer_pool_size = 1 # increase if you're on JRuby
  config.server_renderer_timeout = 20 # seconds

  ################################################################################
  # CLIENT RENDERING OPTIONS
  # Below options can be overriden by passing options to the react_on_rails
  # `render_component` view helper method.
  ################################################################################
  # default is false
  config.prerender = false
end
