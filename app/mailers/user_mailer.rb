class UserMailer < ActionMailer::Base
  def confirm_registration(user)
    @user = user
    mail(to: ['bsstr@yandex.ru', user.email], from: 'noreply@tripbase.risentveber.ru', subject: 'Подтверждение регистрации')
  end
end