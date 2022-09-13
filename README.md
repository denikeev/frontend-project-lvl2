[![Node CI](https://github.com/denikeev/frontend-project-lvl2/actions/workflows/tests-and-lint.yml/badge.svg)](https://github.com/denikeev/frontend-project-lvl2/actions/workflows/tests-and-lint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/38df8dfdc89f6b6302dc/maintainability)](https://codeclimate.com/github/denikeev/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/38df8dfdc89f6b6302dc/test_coverage)](https://codeclimate.com/github/denikeev/frontend-project-lvl2/test_coverage)
[![Actions Status](https://github.com/denikeev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/denikeev/frontend-project-lvl2/actions)

# Difference generator
Difference generator is a cli program that determines the difference between two data structures.

### Utility features:
* Support for different input formats: yaml, json
* Report generation as plain text, stylish and json

## Setup

```sh
make install
make link
```

## Example
```
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
## Demos:
<details><summary>step 3</summary>

[![step 3](https://asciinema.org/a/mfHpGuznUZkZBn3K7g4n4ZP6L.svg)](https://asciinema.org/a/mfHpGuznUZkZBn3K7g4n4ZP6L)  

</details>
<details><summary>step 5</summary>

[![step 5](https://asciinema.org/a/SDLWPPJ54ljkJU5DrS6mqNUQj.svg)](https://asciinema.org/a/SDLWPPJ54ljkJU5DrS6mqNUQj)  

</details>
<details><summary>step 6</summary>

[![step 6](https://asciinema.org/a/AqUtfy0vkoRPnbhtemEZfjFyd.svg)](https://asciinema.org/a/AqUtfy0vkoRPnbhtemEZfjFyd)  

</details>
<details><summary>step 7</summary>

[![step 7](https://asciinema.org/a/r8ip17jTSIFmNvnFFBHnw7Ofa.svg)](https://asciinema.org/a/r8ip17jTSIFmNvnFFBHnw7Ofa)  

</details>
<details><summary>step 8</summary>

[![step 8](https://asciinema.org/a/vmfsFNHCLWYu4wAmflvkCBiee.svg)](https://asciinema.org/a/vmfsFNHCLWYu4wAmflvkCBiee)  

</details>