class AddDeckRefToCards < ActiveRecord::Migration[6.0]
  def change
    add_reference :cards, :deck, index: true, null: false, foreign_key: true
  end
end
