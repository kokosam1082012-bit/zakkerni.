# فكرني — Fakkerni (APK)

## طريقة الحصول على الـ APK (بدون Android Studio)
1. ادخل github.com وسجّل حساب مجاني.
2. اعمل Repository جديد (New repository) باسم zakkerni.
3. ارفع **محتويات** هذا المجلد كلها (Add file ← Upload files)، مع مجلد `.github`.
   لو مجلد `.github` ما اترفعش: Add file ← Create new file، اكتب الاسم
   `.github/workflows/build-apk.yml` والصق محتوى الملف.
4. افتح تبويب **Actions** ← Build APK ← Run workflow (يشتغل تلقائياً بعد الرفع).
5. بعد دقائق، افتح التشغيل الناجح ونزّل **zakkerni-apk** من Artifacts، فك الضغط وثبّت app-debug.apk.

## على الموبايل
- اسمح بالإشعارات عند أول فتح، واسمح بـ "المنبهات والتذكيرات" لو طلب منك.
- في بعض الأجهزة (Xiaomi, Huawei, Oppo...) فعّل "التشغيل التلقائي" وأوقف "توفير البطارية" للتطبيق.
