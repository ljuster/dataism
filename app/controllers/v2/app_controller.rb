module V2
  class AppController < ApplicationController
    helper_method :calc_props

    def index
      render layout: 'react_application'
    end

    def calc_props
      case params[:react_route]&.to_sym
      when nil
        # TODO: props for the home page will go here
        {}
      when :results
        calc_results
      else
        # Props for pages not mentioned above
        {}
      end
    end

    def calc_results
      render(
        template: "v2/app/results.json",
        locals: {selected_city: {id: 5, state_code: 'CA', city: 'LA'}, selected_state: {active: true, id: 2, name: 'Cali', code: 'CA'}, selected_date: Time.now}
      )
    end
  end
end
