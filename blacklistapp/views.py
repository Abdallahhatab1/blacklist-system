
from django.shortcuts import render
from .models import BlacklistWord
from django.http import JsonResponse


# Create your views here.
def main(request):
    return render(request, "pages/index.html", {"name": "hello"})



# او من مخازن اخرى json ممكن نجيب كلمات من ملفات 
darklistwordstoadd = ["Hack", "Bug"]

# وهذا منطق اضافة الكلمات
for word in darklistwordstoadd: 
    BlacklistWord.objects.get_or_create(word=word)


# أضفت تعليقات فقط لتذكر الخطوات
def check_text(request):
    # نتحقق اذا الطلب بوست وهو الطلب اللي ينرسل من الفيتش
    if request.method == "POST":
        
        # هذا اخذناه من الجافاسكريبت text نجيب العنصر اللي بأسم
        # `text=${input.value...}` بستخدام
        user_text = request.POST.get("text")

        # databaseهيك نقدر نجيب قائمة بكل الكلمات المحظورة المخزنة بال
        words = BlacklistWord.objects.values_list('word', flat=True)

        # blacklistلوب للتحقق اذا فيه كلمة من ضمن ال 
        for word in words: 
            if word.lower() in user_text.lower(): # عشان لا يفرق lower هنا عملنا اول حرف
                
                # اذا لقينا كلمة نرجع بخطأ وبشكل غامض لحتى ما يفهمها الهكر
                return JsonResponse({
                    "status": "error",
                    "message": "Forbidden Word Detected"
                })

        # blacklistاذا ما لقينا نكلمة تقول النص سليم دون ذكر ال
        return JsonResponse({
            "status": "success",
            "message": "Text is clean"
        })


