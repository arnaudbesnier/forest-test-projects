class Forest::BikesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def download
    headers['Access-Control-Expose-Headers'] = 'Content-Disposition'
    send_data('{ toto: tutu }',
              filename: 'toto_fait_du_velo.json',
              type: 'json',
              disposition: 'attachment')
  end
end
