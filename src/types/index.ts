export enum MessageType {
  // 登录请求消息
  LoginRequestMessage = 0,
  // 登录响应消息
  LoginResponseMessage = 1,
  // 单聊请求消息
  ChatRequestMessage = 2,
  // 单聊响应消息
  ChatResponseMessage = 3,
  // 创建群请求消息
  GroupCreateRequestMessage = 4,
  // 创建群响应消息
  GroupCreateResponseMessage = 5,
  // 加入群请求消息
  GroupJoinRequestMessage = 6,
  // 加入群响应消息
  GroupJoinResponseMessage = 7,
  // 退出群请求消息
  GroupQuitRequestMessage = 8,
  // 退出群响应消息
  GroupQuitResponseMessage = 9,
  // 群聊请求消息
  GroupChatRequestMessage = 10,
  // 群聊响应消息
  GroupChatResponseMessage = 11,
  // 获取群成员请求消息
  GroupMembersRequestMessage = 12,
  // 获取群成员响应消息
  GroupMembersResponseMessage = 13,
  // Ping请求消息
  PingMessage = 14,
  // Pong响应消息
  PongMessage = 15
}
