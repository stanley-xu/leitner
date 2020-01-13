class DecksController < ApplicationController
  def index
    @decks = Deck.all
    @deck = Deck.new # for the new card form
  end

  def new
    # if the call to `save` fails in the `create` method below,
    # it renders the `new` view which references `@deck`
    # therefore, we need to initialize @deck here so that view works
    @deck = Deck.new
  end

  # handles POST request from `new` view
  def create
    @deck = Deck.new(deck_params)
    if @deck.save
      # `redirect_to` issues a new request to browser
      redirect_to action: 'index'
    else
      render 'new' # render new template
    end
  end

  def edit
    @deck = Deck.find(params[:id])
  end

  def update
    @deck = Deck.find(params[:id])

    if @deck.update(deck_params)
      redirect_to edit_deck_path(@deck)
    else
      render 'edit'
    end
  end

  def destroy
    @deck = Deck.find(params[:id])
    @deck.destroy

    redirect_to decks_path # we can't redirect to deck_path (we've destroyed it)
  end

  def quiz
    @deck = Deck.find(params[:id])
    render partial: 'cards/quiz', collection: @deck.quiz
  end

  private

  # Rails' "strong parameters" security feature for params checking...
  #   here, we're effectively whitelisting ONLY the params we need
  def deck_params
    params.require(:deck).permit(:name)
  end
end