require 'jsonapi-serializers'
require 'csv'

class Forest::PaymentsController < ForestLiana::ApplicationController
  def index
    @payments = [
      Forest::Payment.new(
        id: 1,
        amount: 1000,
        currency: 'USD'
      ),
      Forest::Payment.new(
        id: 2,
        amount: 2000,
        currency: 'EUR'
      ),
      Forest::Payment.new(
        id: 3,
        amount: 3000,
        currency: 'USD'
      )
    ]

    #render json: JSONAPI::Serializer.serialize(@payments, is_collection: true)
    respond_to do |format|
      format.json do
        render serializer: nil, json: JSONAPI::Serializer.serialize(@payments, is_collection: true)
      end
      format.csv do
        set_headers_file
        set_headers_streaming

        response.status = 200
        csv_header = params[:header].split(',')
        field_names_requested = params[:fields]['payments'].split(',').map { |name| name.to_s }

        self.response_body = Enumerator.new do |content|
          content << ::CSV::Row.new(field_names_requested, csv_header, true).to_s
          @payments.each do |payment|
            content << ::CSV::Row.new(field_names_requested, payment.data.values).to_s
          end
        end
      end
    end
  end
end
