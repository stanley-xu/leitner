// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Global Javascript source
//  Only require JS here that should be compiled into a single app-wide bundle

// Materialize
require('materialize-css')
require('./init_modals')

// Javascript that belongs only to certain parts of pages should exist in a proper project dir
//  e.g. app/javascript/widget/
// You must still create a corresponding pack file for Webpack to use as an entry point
//  e.g. app/javascript/packs/widget.js -> contains -> `import 'widget'
// Such pack files are also referenced by `javascript_pack_include` tags

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
