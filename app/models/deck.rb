# ActiveRecord::Base offers out-of-the-box:
#   CRUD, validation, search support
#   and ways to relate multiple models with eachother
class Deck < ActiveRecord::Base
  # 1:N (Deck:Cards)
  # Requirement: delete every card owned by a deck when the deck is destroyed
  has_many :cards, dependent: :destroy

  # validation on the name: must exist
  # failed validations make `Model#save` return false
  validates :name, presence: true

  # TODO: refactor this fat model
  def quiz
    med_box = cards.where(priority: 1)
    low_box = cards.where(priority: 0)
    high_box = cards.where(priority: 2)
    boxes = [ low_box, med_box, high_box ]

    box = boxes.find { |b| b.size != 0 } 

    box
  end

end