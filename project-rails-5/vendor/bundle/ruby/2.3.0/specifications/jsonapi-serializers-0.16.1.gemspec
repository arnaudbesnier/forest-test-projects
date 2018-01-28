# -*- encoding: utf-8 -*-
# stub: jsonapi-serializers 0.16.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jsonapi-serializers"
  s.version = "0.16.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Mike Fotinakis"]
  s.date = "2016-10-18"
  s.description = "Pure Ruby readonly serializers for the JSON:API spec."
  s.email = ["mike@fotinakis.com"]
  s.homepage = "https://github.com/fotinakis/jsonapi-serializers"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.1"
  s.summary = "Pure Ruby readonly serializers for the JSON:API spec."

  s.installed_by_version = "2.5.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activesupport>, [">= 0"])
      s.add_development_dependency(%q<bundler>, [">= 0"])
      s.add_development_dependency(%q<rake>, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>, ["~> 3.2"])
      s.add_development_dependency(%q<factory_girl>, ["~> 4.5"])
      s.add_development_dependency(%q<activemodel>, ["~> 4.2"])
    else
      s.add_dependency(%q<activesupport>, [">= 0"])
      s.add_dependency(%q<bundler>, [">= 0"])
      s.add_dependency(%q<rake>, ["~> 10.0"])
      s.add_dependency(%q<rspec>, ["~> 3.2"])
      s.add_dependency(%q<factory_girl>, ["~> 4.5"])
      s.add_dependency(%q<activemodel>, ["~> 4.2"])
    end
  else
    s.add_dependency(%q<activesupport>, [">= 0"])
    s.add_dependency(%q<bundler>, [">= 0"])
    s.add_dependency(%q<rake>, ["~> 10.0"])
    s.add_dependency(%q<rspec>, ["~> 3.2"])
    s.add_dependency(%q<factory_girl>, ["~> 4.5"])
    s.add_dependency(%q<activemodel>, ["~> 4.2"])
  end
end
