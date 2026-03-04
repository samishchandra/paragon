# TODO

- [x] Fix: nested list items with links break when switching between raw markdown and WYSIWYG modes
  - Nested bullet `  -   [www.greatgoing.com](http://www.greatgoing.com)` is extracted from list and rendered as code block
  - Need to investigate markdown→HTML and HTML→markdown conversion pipeline
- [x] Add round-trip tests for nested lists with links to prevent regressions
- [x] Fix: unnecessary blank lines between list items with nested sub-lists after mode switch
- [x] Add round-trip regression test for multiple sibling list items with nested sub-lists + links
- [x] Add splitSeparatedLists unit test for sibling-with-nested-children pattern
- [x] Feature: indent on ordered list item should convert to bullet list instead of nested ordered list
- [x] Fix: pressing Enter in list item with inline code carries over code mark to new list item
- [x] Fix: selecting an image and pressing Cmd+C should copy the image
- [x] Fix: zero-width space character (U+200B) present in copied markdown text
- [ ] Audit: scan codebase for invisible Unicode characters that could leak into markdown output
- [x] Fix: blank line preservation broken by stripZWSP — extra newlines between sections are lost after mode switch
- [x] Add stripZWSP unit tests and blank line preservation round-trip tests
- [x] Fix: code block showing an extra blank line in WYSIWYG editor
