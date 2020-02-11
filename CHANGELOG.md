# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Add Design Tokens. These will allow for the application of Harmonium's styles in more than just web applications.
- Renamed many of the top-level sass variable names. Below is a chart cataloging the changes

| Before                      | After                       |
| --------------------------- | --------------------------- |
| `$test`                     | `$color-test`               |
| `$brand`                    | `$color-brand-primary`      |
| `$brand-secondary`          | `$color-brand-secondary`    |
| `$brand-tertiary`           | `$color-brand-tertiary`     |
| `$white`                    | `$color-white`              |
| `$white-0`                  | `$color-white-0`            |
| `$white-03`                 | `$color-white-03`           |
| `$white-06`                 | `$color-white-06`           |
| `$white-10`                 | `$color-white-10`           |
| `$white-20`                 | `$color-white-20`           |
| `$white-30`                 | `$color-white-30`           |
| `$white-40`                 | `$color-white-40`           |
| `$white-50`                 | `$color-white-50`           |
| `$white-60`                 | `$color-white-60`           |
| `$white-70`                 | `$color-white-70`           |
| `$white-80`                 | `$color-white-80`           |
| `$white-90`                 | `$color-white-90`           |
| `$lightest-gray`            | `$color-lightest-gray`      |
| `$lighter-gray`             | `$color-lighter-gray`       |
| `$light-gray`               | `$color-light-gray`         |
| `$gray`                     | `$color-gray`               |
| `$dark-gray`                | `$color-dark-gray`          |
| `$darker-gray`              | `$color-darker-gray`        |
| `$black`                    | `$color-black`              |
| `$black-0`                  | `$color-black-0`            |
| `$black-03`                 | `$color-black-03`           |
| `$black-06`                 | `$color-black-06`           |
| `$black-10`                 | `$color-black-10`           |
| `$black-20`                 | `$color-black-20`           |
| `$black-30`                 | `$color-black-30`           |
| `$black-40`                 | `$color-black-40`           |
| `$black-50`                 | `$color-black-50`           |
| `$black-60`                 | `$color-black-60`           |
| `$black-70`                 | `$color-black-70`           |
| `$black-80`                 | `$color-black-80`           |
| `$black-90`                 | `$color-black-90`           |
| `$primary`                  | `$color-ui-primary`         |
| `$success`                  | `$color-ui-success`         |
| `$alert`                    | `$color-ui-alert`           |
| `$warning`                  | `$color-ui-warning`         |
| `$error`                    | `$color-ui-error`           |
| `$divider-color`            | `$color-divider`            |
| `$divider-color-dark`       | `$color-divider-dark`       |
| `$divider-color-light`      | `$color-divider-light`      |
| `$muted`                    | `$color-muted`              |
| `$very-muted`               | `$color-very-muted`         |
| `$disabled`                 | `$color-disabled`           |
| `$small`                    | `$screen-width-small`       |
| `$medium`                   | `$screen-width-medium`      |
| `$large`                    | `$screen-width-large`       |
| `$xlarge`                   | `$screen-width-xlarge`      |
| `$xxlarge`                  | `$screen-width-xxlarge`     |
| `$nav`                      | `$screen-width-nav`         |
| `$global-width`             | `$screen-width-full`        |
| `$global-monospace-font`    | `$font-family-monospace`    |
| `$global-serif-font`        | `$font-family-serif`        |
| `$global-sans-serif-font`   | `$font-family-sans-serif`   |
| `$global-font-size`         | `$font-size-base`           |
| `$global-font-size-smaller` | `$font-size-smaller`        |
| `$global-font-size-small`   | `$font-size-small`          |
| `$global-font-size-medium`  | `$font-size-medium`         |
| `$global-font-size-large`   | `$font-size-large`          |
| `$global-font-size-larger`  | `$font-size-larger`         |
| `$global-font-size-largest` | `$font-size-largest`        |
| `$global-weight-light`      | `$font-weight-light`        |
| `$global-weight-normal`     | `$font-weight-normal`       |
| `$global-weight-bold`       | `$font-weight-bold`         |
| `$global-lineheight`        | `$line-height-global`       |
| `$base-lineheight`          | `$line-height-base`         |
| `$global-vertical-space`    | `$spacing-base`             |
| `$global-horizontal-space`  | `$spacing-base`             |
| `$base-size`                | `$spacing-base`             |
| `$global-padding-tiny`      | `$padding-tiny`             |
| `$global-padding-small`     | `$padding-small`            |
| `$global-padding-large`     | `$padding-large`            |
| `$global-padding-larger`    | `$padding-larger`           |
| `$global-padding`           | `$padding-base`             |
| `$global-margin-tiny`       | `$margin-tiny`              |
| `$global-margin-small`      | `$margin-small`             |
| `$global-margin-large`      | `$margin-large`             |
| `$global-margin-larger`     | `$margin-larger`            |
| `$global-margin`            | `$margin-base`              |
| `$global-radius`            | `$border-radius-small`      |
| `$global-rounded`           | `$border-radius-rounded`    |
| `$color-disabled-opacity`   | `$opacity-disabled`         |
| `$global-box-shadow`        | `$box-shadow-default`       |
| `$global-box-hover`         | `$box-shadow-hover`         |
| `$global-box-active`        | `$box-shadow-active`        |
| `$image-blur`               | `$blur-enabled`             |
| `$no-image-blur`            | `$blur-disabled`            |
| `$size-tiny`                | `$icon-size-tiny`           |
| `$size-small`               | `$icon-size-small`          |
| `$size-default`             | `$icon-size-base`           |
| `$size-large`               | `$icon-size-large`          |
| `$size-larger`              | `$icon-size-larger`         |
| `$size-largest`             | `$icon-size-largest`        |
| `$above-everything`         | `$z-index-above-everything` |
| `$above-most`               | `$z-index-above-most`       |
| `$above`                    | `$z-index-above`            |
| `$default`                  | `$z-index-default`          |
| `$below`                    | `$z-index-below`            |
| `$below-most`               | `$z-index-below-most`       |
| `$below-everything`         | `$z-index-below-everything` |

- Added new variables for spacing. These control the spacing for padding and margins
  - `$spacing-base`
  - `$spacing-tiny`
  - `$spacing-small`
  - `$spacing-medium`
  - `$spacing-large`
  - `$spacing-larger`
