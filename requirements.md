# 考勤查询系统需求文档

## 1. 用户界面功能
- 用户输入token
- 用户输入姓名
- 用户选择查询时间范围（时间选择器）
- 点击查询按钮

## 2. 查询考勤记录

### 2.1 请求配置
- **API地址**: `https://api.maxvisioncloud.com/bp-acs/record/queryIdentifyRecordByPersonPerm`
- **请求方法**: POST
- **请求头**: 自动添加 `satoken` 头，值为用户输入的token

### 2.2 请求参数
```json
{
    "pageNum": 1,
    "pageSize": 10,
    "total": 0,
    "groupName": "",
    "month": "",
    "personName": "",
    "identifyTime": [
        "2025-10-20 00:00:00",
        "2025-10-20 23:59:59"
    ],
    "startTime": "2025-10-20 00:00:00",
    "endTime": "2025-10-20 23:59:59"
}
```

### 2.3 默认时间设置
如果用户没有选择时间，则使用以下默认值：
- `identifyTime`: 自动获取当天凌晨0点 到 今日23:59:59
- `startTime`: 自动获取当天凌晨0点 到 今日23:59:59  
- `endTime`: 自动获取当天凌晨0点 到 今日23:59:59
- 其他参数保持不变

### 2.4 返回结果示例
```json
{
    "code": 200,
    "msg": "OK",
    "data": [
        {
            "createBy": "22",
            "createTime": "2025-10-20 08:35:33",
            "updateBy": "22",
            "updateTime": "2025-10-20 08:35:33",
            "id": 286196,
            "identifyRecordId": "IC202510200835339625618795872041",
            "deviceId": "DE202508131757521958489257277969",
            "deviceName": "盛视大厦-岗亭人脸入1",
            "personId": "PS202311032154409754564050924168",
            "personName": "吴雅丹",
            "personIdType": "0",
            "identifyType": "1",
            "identifyStatus": "1",
            "identifyTime": "2025-10-20 08:35:31",
            "taskId": "3ED0F4855CD34D6F828931359336778A",
            "identityId": "0",
            "similarity": "84",
            "identifyImage": "https://ossapi.maxvisioncloud.com/timage/accesscontrol/pass/pic/2025/10/20/3ED0F4855CD34D6F828931359336778A_1.jpg",
            "teamId": 8,
            "keepImage": "https://ossapi.maxvisioncloud.com/biometric/biometric/face/2024/05/31/xh8g9m.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=L3V5T51IRYRI0JGD9MCV%2F20251020%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251020T023216Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=5f12571eed1c1f2afa6a7878318d522d975c8948a02a768996d27eda02aa4c15",
            "identity": null,
            "areaId": null,
            "areaName": null,
            "organizeId": null,
            "organizeName": null,
            "identifyInfo": "[{\"identityId\":\"0\",\"identityType\":1,\"similarity\":\"84\",\"snapshotPath\":\"https://ossapi.maxvisioncloud.com/timage/accesscontrol/pass/pic/2025/10/20/3ED0F4855CD34D6F828931359336778A_1.jpg\"}]",
            "identifyDesc": "0",
            "errCode": 4300,
            "deviceCardNumber": "",
            "personCardNumber": null,
            "number": "325",
            "passStatus": "1"
        }
    ],
    "total": 1,
    "success": true
}
```

## 3. 数据处理与转换

### 3.1 数据解析规则
对查询结果进行解析，创建新的 `params` 对象，按以下规则处理：

| 源字段 | 目标字段 | 处理规则 |
|--------|----------|----------|
| `id` | `id` | 任意修改后三位数字，保持位数不变 |
| `identifyRecordId` | `identifyRecordId` | 任意修改后三位数字，保持位数不变 |
| `taskId` | `taskId` | 直接复制 |
| `personId` | `personId` | 直接复制 |
| `personName` | `personName` | 直接复制 |
| `keepImage` | `keepImage` | 截取 `biometric` 开头，`.jpg` 结尾的部分 |
| `identifyImage` | `identifyImage` | 直接复制 |
| `identifyInfo` | `identifyInfo` | 直接复制（JSON字符串） |
| `similarity` | `similarity` | 直接复制 |
| `deviceId` | `deviceId` | 直接复制 |

### 3.2 keepImage 处理示例
- 原始值: `https://ossapi.maxvisioncloud.com/biometric/biometric/face/2024/05/31/xh8g9m.jpg?X-Amz-Algorithm=...`
- 处理后: `biometric/face/2024/05/31/xh8g9m.jpg`

## 4. 发送处理后的数据

### 4.1 请求配置
- **API地址**: `https://api.maxvisioncloud.com/bp-acs/demo/kafka`
- **请求方法**: POST
- **请求头**: 自定义 `satoken` 头，值为用户输入的token

### 4.2 请求参数示例
```json
{
  "id": 286992,
  "identifyRecordId": "IC202510200841331466109443114789",
  "deviceId": "DE202509161830200233281794631517",
  "deviceName": "盛视大厦-岗亭人脸入2",
  "personId": "PS202505260906188006962549253175",
  "personName": "李炎龙",
  "personIdType": "0",
  "identifyType": "0",
  "identifyStatus": "1",
  "identifyTime": "2025-10-20 08:21:00",
  "identifyTimeStr": "2025-10-20 08:21:00",
  "taskId": "1D55D1149ADC45C9B89EE3CD54EF0KUI",
  "identityId": "0",
  "similarity": "97",
  "identifyImage": "https://ossapi.maxvisioncloud.com/timage/accesscontrol/pass/pic/2025/10/20/1D55D1149ADC45C9B89EE3CD54EF0EFE_1.jpg",
  "managerId": "22",
  "keepImage": "biometric/face/2025/05/26/4aif9m.jpg",
  "identity": "",
  "areaId": "587",
  "areaName": "盛视总部（深圳）/总部岗亭",
  "organizeId": "",
  "organizeName": "",
  "identifyInfo": "[{\"identityId\":\"0\",\"identityType\":1,\"similarity\":\"97\",\"snapshotPath\":\"https://ossapi.maxvisioncloud.com/timage/accesscontrol/pass/pic/2025/10/20/1D55D1149ADC45C9B89EE3CD54EF0EFE_1.jpg\"}]",
  "identifyDesc": ""
}
```

### 4.3 返回结果
```json
{
    "code": 200,
    "msg": "OK",
    "data": null
}
```

## 5. 用户操作
点击新的发送按钮发送处理后的数据

## 6. 输出
每一步都要输出结果console.log，包括请求参数，请求头，返回结果。