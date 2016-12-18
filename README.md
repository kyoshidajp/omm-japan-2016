# OMM-JAPAN-2016

[![Build Status](https://travis-ci.org/kyoshidajp/omm-japan-2016.svg?branch=master)](https://travis-ci.org/kyoshidajp/omm-japan-2016)

OMM-JAPAN-2016 is an application that visually displays the result of [OMM JAPAN 2016 Omachi](http://theomm.jp/?page_id=1063).

**Note: This is not an official site of [OMM](https://www.theomm.com/).**

## Live App

[https://omm-japan-2016.herokuapp.com](https://omm-japan-2016.herokuapp.com)

## Local Installation and Running

1. Install [Node.js](https://nodejs.org/) and Set PATH
1. Install [PostgreSQL](https://www.postgresql.org/) and Run
1. `git clone git@github.com:kyoshidajp/omm-japan-2016.git`
1. `cd omm-japan-2016`
1. `bundle install --path vendor/bundle`
1. `npm install`
1. `bundle exec rake db:seed_fu`
1. `bundle exec foreman start`
1. Go to [http://localhost:5000/](http://localhost:5000/)

## Requirements

- Ruby(MRI) 2.3.0 or higher
- Bundler 1.13.6 or higher
- Node.js v4.2.2 or higher
- PostgreSQL 9.4.4 or higher

## LICENSE

[MIT License](https://github.com/kyoshidajp/omm-japan-2016/blob/master/LICENSE)

## Author

[kyoshidajp](https://github.com/kyoshidajp)
