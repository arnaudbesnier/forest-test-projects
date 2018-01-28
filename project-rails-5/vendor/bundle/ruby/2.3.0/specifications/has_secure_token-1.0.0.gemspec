# -*- encoding: utf-8 -*-
# stub: has_secure_token 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "has_secure_token"
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Roberto Miranda Altamar"]
  s.date = "2015-04-24"
  s.description = "HasSecureToken provides you an easily way to geneatre uniques random tokens for any model in ruby on rails. **SecureRandom::base58** is used to generate the 24-character unique token, so collisions are highly unlikely."
  s.email = ["rjmaltamar@gmail.com"]
  s.homepage = "https://github.com/robertomiranda/has_secure_token"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Create uniques random tokens for any model in ruby on rails. Backport of ActiveRecord::SecureToken 5 to AR 3.x and 4.x"

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activerecord>, [">= 3.0"])
      s.add_development_dependency(%q<bundler>, ["~> 1.3"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<minitest>, [">= 0"])
      s.add_development_dependency(%q<sqlite3>, [">= 0"])
    else
      s.add_dependency(%q<activerecord>, [">= 3.0"])
      s.add_dependency(%q<bundler>, ["~> 1.3"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<minitest>, [">= 0"])
      s.add_dependency(%q<sqlite3>, [">= 0"])
    end
  else
    s.add_dependency(%q<activerecord>, [">= 3.0"])
    s.add_dependency(%q<bundler>, ["~> 1.3"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<minitest>, [">= 0"])
    s.add_dependency(%q<sqlite3>, [">= 0"])
  end
end
