class Card < ApplicationRecord
  belongs_to :deck

  validates :question, presence: true
  validates :answer, presence: true

  after_initialize :default_values

  def default_values
    self.priority ||= 1
  end
end
