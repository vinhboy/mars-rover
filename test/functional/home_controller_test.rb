require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get index and respond with the correct json" do
    get :index, {'format' => 'json', 'commands' => "5 5\n1 2 N\nL M L M L M L M M\n3 3 E\nM M R M M R M R R M"}
    assert_equal "[[1,3,\"N\"],[5,1,\"E\"]]",@response.body
    assert_response :success
  end
end
