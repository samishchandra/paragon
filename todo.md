# TODO

- [x] Fix: nested list items with links break when switching between raw markdown and WYSIWYG modes
  - Nested bullet `  -   [www.greatgoing.com](http://www.greatgoing.com)` is extracted from list and rendered as code block
  - Need to investigate markdown→HTML and HTML→markdown conversion pipeline
- [x] Add round-trip tests for nested lists with links to prevent regressions
