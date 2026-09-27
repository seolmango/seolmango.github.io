---
title: "피보나치 수열과 벤포드 법칙"
summary: "피보나치 수열의 첫 자릿수 분포가 진법별 벤포드 법칙을 따르는지 확인하는 프로그램입니다."
field: "software"
repo: "https://github.com/seolmango/FibonacciBenfordLawCheck"
images: [{"src": "https://raw.githubusercontent.com/seolmango/FibonacciBenfordLawCheck/HEAD/results/result(Base10_10000).png", "alt": "10진법에서 피보나치 수열 10000개의 첫 자릿수 분포 그래프", "caption": "10진법, 첫 10,000개"}]
tags: ["Python", "수학", "벤포드 법칙"]
period: "2023"
featured: false
order: 5.2
---

처음 10,000개의 피보나치 수를 8진법, 10진법, 20진법으로 살펴보고 첫 자릿수의 빈도를 셉니다.

관측한 분포를 각 진법의 벤포드 법칙 예측값 log_n(1 + 1/d)와 비교해 일치하는 양상을 확인합니다. 여기서 n은 진법의 밑, d는 첫 자릿수입니다.
