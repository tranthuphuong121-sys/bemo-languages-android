# BeMo Languages Android 4.6

## Có gì mới
- Bảng **Kiểm tra thiết bị** ngay trong ứng dụng: lưu dữ liệu, hỗ trợ TTS, API micro (không xin quyền hoặc ghi âm), HTTPS, bộ nhớ ngoại tuyến và nhận diện Android.
- Bổ sung lệnh tạo APK debug trên Windows, đồng thời giữ nguyên tính năng sao lưu/khôi phục JSON và 28 câu minh họa.
- Không có chấm điểm phát âm tự động; kết quả kiểm tra chỉ cho biết API có sẵn, không xác nhận micro hoặc giọng nói chạy tốt.

## Build APK debug trên Windows
1. Cài Node.js LTS, JDK và Android Studio/Android SDK; mở Android Studio để cài SDK Platform và Build Tools.
2. Giải nén ZIP và mở Terminal/PowerShell trong thư mục chứa package.json.
3. Chạy lần lượt:

```powershell
npm install
npm run verify
npx cap add android
npm run android:sync
npm run android:open
```

4. Trong Android Studio, chờ Gradle sync, chọn **Build > Build Bundle(s) / APK(s) > Build APK(s)**. APK debug thường nằm tại `android/app/build/outputs/apk/debug/app-debug.apk`. Có thể dùng `npm run android:apk:windows` sau khi đã thêm thư mục android.
5. Chép APK vào điện thoại Android của chính bạn để cài thử. Cài từ tệp APK có thể cần xác nhận quyền cài ứng dụng từ nguồn này. Chỉ dùng tệp tự build từ mã nguồn đã kiểm tra.

## Kiểm thử thủ công trên Android
- Tạo hai hồ sơ, hoàn thành bài và khởi động lại ứng dụng; kiểm tra tiến độ riêng.
- Nghe phát âm ở cả bốn ngôn ngữ; kiểm tra các giọng TTS thực tế có trên máy.
- Mở toàn bộ sáu truyện, tắt mạng, mở lại và kiểm tra ảnh cùng nội dung.
- Xuất bản sao lưu JSON, nhập khôi phục thử trên dữ liệu mẫu.
- Mở **Kiểm tra thiết bị** và xem từng cảnh báo.

**Chưa tạo APK/AAB trong môi trường này, chưa kiểm thử điện thoại Android thật và chưa phát hành Google Play.**


## v4.7 — Độ tin cậy ngoại tuyến
- Service worker chỉ xóa các cache có tiền tố `bemo-languages-`, không xóa dữ liệu cache của ứng dụng khác cùng origin.
- Khi điều hướng trang: ưu tiên phiên bản trực tuyến nếu có kết nối, tự quay về bản đã lưu nếu mất mạng. Tài nguyên học đã lưu tiếp tục dùng cache-first.
- Có bài kiểm thử tự động cho cơ chế service worker bằng mock CacheStorage và fetch. Chạy `npm run verify` để kiểm tra.
- **Chưa có APK được biên dịch và chưa kiểm thử trên điện thoại thật.** Để tạo APK cần Android SDK/Gradle trên máy có Android Studio.


## Phiên bản 4.8 – IPA & Tai thính
- Tab IPA: 44 âm, khẩu hình và từ mẫu.
- Kiểm tra nghe giống/khác bằng các từ gần âm. Giọng đọc phụ thuộc thiết bị, không chấm micro tự động.
- Tiến độ học từng âm và điểm nghe lưu theo hồ sơ.
- Chưa có APK Android được biên dịch hoặc kiểm thử trên điện thoại thật.

## 4.9 – Phonics ghép chữ thành âm
Trong tab IPA & Tai thính (tiếng Anh) có bài ghép 8 từ, tự đọc trước khi xem IPA, nghe từ mẫu qua TTS và câu hỏi lựa chọn. Chưa có ghi âm/chấm micro; không có APK trong gói này.

## Phiên bản 4.10
- Bài kiểm tra nghe IPA xáo trộn đáp án giống/khác để tránh học thuộc thứ tự.
- Nút nghe A–B xếp hai lượt đọc nối tiếp, không hủy âm A.
- Phonics mở rộng từ 8 lên 16 từ với sh, ch, ai, oa, igh, oo và cụm st.
- Đây là mã nguồn Capacitor, chưa phải APK và chưa được thử trên điện thoại thật.

## 4.11: Đọc trước, xem IPA sau
- Phonics ẩn các lựa chọn IPA ban đầu; trẻ phải thử đọc và bấm “Đã thử đọc” để làm bài kiểm tra.
- Phần tách chữ thành âm cũng ẩn tới khi bấm xem gợi ý.
- Đây là bài tự đánh giá, **không phải** chấm giọng nói bằng micro.
- Chưa có APK và chưa kiểm thử trên Android thật.


## BeMo 4.12 — Phonics nghe/đọc âm gần nhau
- Mở rộng từ 16 lên 24 từ ghép âm, bổ sung sit/seat, pin/pen, cap/cup, shop/chip.
- Đáp án nhiễu ưu tiên từ có số âm bằng nhau và chỉ khác ít âm, tránh phương án quá dễ loại trừ.
- Các bài nghe dùng giọng TTS của thiết bị, chưa chấm chất lượng phát âm qua micro.
- Chưa có APK được biên dịch và kiểm thử trên điện thoại thật.

## 4.13 — Tạo APK bằng GitHub Actions (chưa chạy CI)
- Bổ sung `.github/workflows/android-debug-apk.yml` để tạo APK debug trên máy Ubuntu có Android SDK, JDK 21 và Node 22.
- Đẩy **toàn bộ nội dung thư mục dự án** (không phải ZIP nguyên khối) lên repository GitHub của bạn; mở tab **Actions** → **Build Android debug APK** → **Run workflow**.
- Sau khi job **thành công**, mở run → **Artifacts** → tải `bemo-languages-debug-apk`, giải nén và tìm `app-debug.apk`. Tệp APK chỉ tồn tại khi GitHub Actions build thành công; tệp ZIP mã nguồn không thể cài trực tiếp.
- Không tải APK từ nguồn lạ. Chỉ cài APK do chính repository bạn build tạo ra. APK debug chỉ dùng thử, không dùng để phát hành Play Store.
- **Quan trọng:** Chưa chạy workflow GitHub Actions trong môi trường hiện tại, nên chưa thể xác nhận đã có APK hay cài thành công.

## 4.14 — Xác minh APK sau khi build
- GitHub Actions kiểm tra `app-debug.apk` tồn tại và không rỗng.
- Kiểm tra `applicationId` phải là `com.bemo.languages` bằng `aapt dump badging`.
- Dùng `apksigner verify` xác nhận APK đã ký; tạo `apk-sha256.txt` để kiểm tra tính toàn vẹn.
- Sau khi workflow thành công, tải cả `bemo-languages-debug-apk` và `bemo-languages-apk-verification` trong mục Artifacts.
- **Đây mới là kiểm tra tệp APK, không phải kiểm thử cài đặt và sử dụng trên điện thoại thật.**
- APK debug có chữ ký debug, chỉ dùng để thử nghiệm; không sử dụng cho bản phát hành chính thức.
