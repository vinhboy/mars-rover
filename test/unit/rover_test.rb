require 'test_helper'

class RoverTest < ActionView::TestCase
  include Rover
  
  test 'should return correct cardinalality on turn' do
    assert_equal 'W', turn('N','L')
    assert_equal 'E', turn('N','R')
    assert_equal 'N', turn('E','L')
    assert_equal 'S', turn('E','R')
    assert_equal 'E', turn('S','L')
    assert_equal 'W', turn('S','R')
    assert_equal 'S', turn('W','L')
    assert_equal 'N', turn('W','R')
  end
  
  test 'should move north and south' do
    assert_equal [3,4,'N'], forward([5,5],[3,3,'N'])
    assert_equal [3,2,'S'], forward([5,5],[3,3,'S'])
  end
  
  test 'should move east and west' do
    assert_equal [4,3,'E'], forward([5,5],[3,3,'E'])
    assert_equal [2,3,'W'], forward([5,5],[3,3,'W'])
  end
  
  test 'should move according to commands' do
    assert_equal [1,3,'N'], move([5,5],[1,2,'N'],['L','M','L','M','L','M','L','M','M'])
    assert_equal [5,1,'E'], move([5,5],[3,3,'E'],['M','M','R','M','M','R','M','R','R','M'])
  end
  
end