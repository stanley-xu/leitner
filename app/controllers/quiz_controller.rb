class QuizController < ApplicationController
	include QuizTools

	protect_from_forgery with: :null_session
	
  def quiz
    @deck = Deck.find(params[:id])
    render 'quiz/index', locals: { cards: next_box(@deck), deck_id: @deck.id }
  end

  def results
    drilldown = score(params[:responses])
    puts drilldown
    render json: drilldown
	end
	
end