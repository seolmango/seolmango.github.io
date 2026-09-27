---
title: "KHAOS 비행 궤적 추정 (EKF)"
summary: "로켓 비행 중의 IMU·GPS·기압 센서 데이터를 확장 칼만 필터로 종합해 비행 궤적을 추정하는 저장소의 포크입니다."
field: "both"
repo: "https://github.com/seolmango/KHAOS-Tracking-Algorithm"
links: [{"label": "원본 저장소 (snu-hanaro)", "url": "https://github.com/snu-hanaro/KHAOS-Tracking-Algorithm"}]
tags: ["Python", "EKF", "센서 융합", "로켓"]
period: "2026"
featured: true
order: 3.5
---

서울대학교 로켓 동아리 하나로의 KHAOS 비행 궤적 추정 저장소를 포크해 작업했습니다. 비행 중 수집한 IMU·GPS·기압 센서 데이터를 확장 칼만 필터(EKF)로 종합해 궤적을 추정합니다.

원본 저장소의 설명에 따르면 IMU 궤적에는 RK4 적분과 쿼터니언 회전을, GPS 궤적에는 하버사인 공식과 좌표 변환을 사용하고 EKF로 두 궤적을 결합합니다.
