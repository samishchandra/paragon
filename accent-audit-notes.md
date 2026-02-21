# Accent Color Audit Notes

Target accent: #008948 (green)

## Issues spotted from screenshots:

### Screenshot 1 - Main app (sidebar + middle panel):
- Sidebar "All Items" active icon/count: using GREEN ✓ (looks correct)
- Sidebar list items (Work Projects): using BLUE text — should be green
- Sidebar tag items (Important): using GREEN ✓ (looks correct)
- Middle panel selected item: using LIGHT BLUE/LAVENDER background — should be light green tint
- Middle panel pinned icon: using TEAL/BLUE — should be green
- Middle panel list/tag pills: "Work Projects" green ✓, "Important" green ✓
- User initials "SK" at bottom left: using GREEN background ✓

### Screenshot 2 - Settings page:
- Settings sidebar active item "Editor": using LIGHT BLUE highlight + BLUE text — should be green
- Section headers "TYPOGRAPHY", "BEHAVIOR": using TEAL/DARK BLUE — should be #008948
- Toggle switch: using BLUE — should be green
- Bottom "Momentum Notes" logo: using GREEN ✓

### Screenshot 3 - Editor tab bar:
- Active tab bottom border: using BLUE — should be #008948
- Tab text appears neutral (correct)

## Key areas to fix:
1. CSS --primary/--accent variable → must map to #008948
2. Selected item background in middle panel → needs green tint
3. Tab bar active border → needs green
4. Settings sidebar active state → needs green
5. Toggle/switch component → needs green
6. Section header text color → needs green
7. Sidebar list item text color → needs green (currently blue)
8. Pinned icon color → needs green
