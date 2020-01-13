module QuizTools
  extend ActiveSupport::Concern

  LOWEST_PRIORITY = 0
  HIGHEST_PRIORITY = 2

  included do
    # TODO: fix starvation
    #   if I get something wrong I should probably review the rest of the cards first
    #   sol: maybe even out priorities periodically RE: MLFQ impl.
    def next_box(deck)
      cards = deck.cards
      med_box = cards.where(priority: 1)
      low_box = cards.where(priority: 0)
      high_box = cards.where(priority: 2)
      boxes = [high_box, med_box, low_box]
  
      boxes.find { |b| !b.empty? }
    end
  
    def score(responses)
      results = []

      responses.each do |r|
        drilldown = {}
        card = Card.find_by(id: r[:id])
        
        if r[:attempt] == r[:answer]
          drilldown[:correct] = true
          card.priority -= 1 if card.priority != LOWEST_PRIORITY
        else
          drilldown[:correct] = false
          card.priority += 1 if card.priority != HIGHEST_PRIORITY
        end

        drilldown[:question] = r[:question]
        drilldown[:answer] = r[:answer]
        drilldown[:attempt] = r[:attempt]
        drilldown[:priority] = r[:priority]
        results.push(drilldown);

        card.save!
      end
      results
    end

  end
end
