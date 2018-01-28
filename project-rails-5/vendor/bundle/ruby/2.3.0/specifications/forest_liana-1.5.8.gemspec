# -*- encoding: utf-8 -*-
# stub: forest_liana 1.5.8 ruby lib

Gem::Specification.new do |s|
  s.name = "forest_liana"
  s.version = "1.5.8"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Sandro Munda"]
  s.date = "2017-01-29"
  s.description = "Instant and Customizable Admin Interface. This Gem is the official Forest admin Liana for Rails."
  s.email = ["sandro@munda.me"]
  s.licenses = ["GPL v3"]
  s.rubygems_version = "2.5.1"
  s.summary = "Instant and Customizable Admin Interface."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, [">= 3.0"])
      s.add_runtime_dependency(%q<jsonapi-serializers>, [">= 0.14.0"])
      s.add_runtime_dependency(%q<jwt>, [">= 0"])
      s.add_runtime_dependency(%q<rack-cors>, [">= 0"])
      s.add_runtime_dependency(%q<arel-helpers>, [">= 0"])
      s.add_runtime_dependency(%q<groupdate>, [">= 0"])
      s.add_runtime_dependency(%q<useragent>, [">= 0"])
      s.add_runtime_dependency(%q<bcrypt>, [">= 0"])
    else
      s.add_dependency(%q<rails>, [">= 3.0"])
      s.add_dependency(%q<jsonapi-serializers>, [">= 0.14.0"])
      s.add_dependency(%q<jwt>, [">= 0"])
      s.add_dependency(%q<rack-cors>, [">= 0"])
      s.add_dependency(%q<arel-helpers>, [">= 0"])
      s.add_dependency(%q<groupdate>, [">= 0"])
      s.add_dependency(%q<useragent>, [">= 0"])
      s.add_dependency(%q<bcrypt>, [">= 0"])
    end
  else
    s.add_dependency(%q<rails>, [">= 3.0"])
    s.add_dependency(%q<jsonapi-serializers>, [">= 0.14.0"])
    s.add_dependency(%q<jwt>, [">= 0"])
    s.add_dependency(%q<rack-cors>, [">= 0"])
    s.add_dependency(%q<arel-helpers>, [">= 0"])
    s.add_dependency(%q<groupdate>, [">= 0"])
    s.add_dependency(%q<useragent>, [">= 0"])
    s.add_dependency(%q<bcrypt>, [">= 0"])
  end
end
