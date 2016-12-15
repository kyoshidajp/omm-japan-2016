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

ActiveRecord::Schema.define(version: 20161211122754) do

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "controls", force: :cascade do |t|
    t.integer  "code"
    t.integer  "points"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.float    "lat"
    t.float    "lng"
    t.boolean  "day1"
    t.boolean  "day2"
    t.index ["code"], name: "index_controls_on_code"
  end

  create_table "players", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "bib"
  end

  create_table "result_controls", force: :cascade do |t|
    t.integer  "result_id"
    t.integer  "control_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["control_id"], name: "index_result_controls_on_control_id"
    t.index ["result_id"], name: "index_result_controls_on_result_id"
  end

  create_table "result_players", force: :cascade do |t|
    t.integer  "result_id"
    t.integer  "player_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_result_players_on_player_id"
    t.index ["result_id"], name: "index_result_players_on_result_id"
  end

  create_table "results", force: :cascade do |t|
    t.integer  "bib"
    t.string   "route"
    t.string   "time"
    t.integer  "score"
    t.integer  "demerit_point"
    t.boolean  "day1"
    t.boolean  "day2"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "rank"
    t.boolean  "disq"
    t.boolean  "ret"
  end

end
