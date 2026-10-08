To use the Ahaleel font in the whole app:

1. Get the font file legitimately (a license that allows embedding it in an app).
2. Rename it to exactly:   ahaleel.ttf   (or ahaleel.otf)  -- lowercase.
3. Create the folder   app/src/main/res/font/   and put the file inside it.
4. Rebuild. No code change is needed: the theme looks for the font by that name
   and falls back to the system font when it is missing.
