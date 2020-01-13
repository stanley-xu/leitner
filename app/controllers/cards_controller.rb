class CardsController < ApplicationController
  def index
    @cards = Card.all
  end

  def new
    # @card = Card.new
  end

  def create
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.create(card_params)
    redirect_to edit_deck_path(@deck)
  end

  def edit
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.find(params[:id])
  end

  def update
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.find(params[:id])

    if @card.update(card_params)
      redirect_to edit_deck_path(@deck)
    else
      render 'edit'
    end
  end

  def destroy
    @deck = Deck.find(params[:deck_id])
    @card = @deck.cards.find(params[:id])
    @card.destroy

    # requirement: need to stay within deck edit form after we delete a card
    redirect_to edit_deck_path(@deck)
  end

  private

  def card_params
    params.require(:card).permit(:question, :answer)
  end
end