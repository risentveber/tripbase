class ErrorsSerializer < ActiveModel::Serializer
  attributes :errors

  def errors
    object.errors.map do |k,v|
      { k => v.capitalize }
    end.reduce(:merge)
  end
end