# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20181202173524) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "algorithms", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "input"
    t.integer "runtime"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "isPalindrome"
    t.string "output"
  end

  create_table "archives", id: :serial, force: :cascade do |t|
    t.string "name", limit: 200
    t.integer "count"
  end

  create_table "data_collections", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "year"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "data_files", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "images", force: :cascade do |t|
    t.text "description"
    t.string "name"
    t.string "url"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", id: :serial, force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "image_url"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "purchases", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "description"
    t.string "image"
    t.datetime "purchase_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "records", id: :serial, force: :cascade do |t|
    t.text "data"
    t.integer "data_file_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_file_id"], name: "index_records_on_data_file_id"
  end

  create_table "variables", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.integer "data_file_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["data_file_id"], name: "index_variables_on_data_file_id"
  end

  create_table "widgets", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "stock"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_foreign_key "records", "data_files"
  add_foreign_key "variables", "data_files"
end
