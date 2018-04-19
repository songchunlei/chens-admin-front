/*
 Navicat Premium Data Transfer

 Source Server         : wjylinux-mysql
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : 47.100.27.82
 Source Database       : qyexam

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 04/16/2018 21:47:34 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `sys_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` varchar(32) NOT NULL,
  `parent_id` varchar(32) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL COMMENT '访问地址',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_by` varchar(32) DEFAULT NULL,
  `update_by` varchar(32) DEFAULT NULL,
  `seq` int(10) DEFAULT NULL COMMENT '排序',
  `isopen` int(10) DEFAULT NULL COMMENT '是否打开 1打开 0不打开',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `tenant_id` varchar(32) DEFAULT NULL,
  `code` varchar(32) DEFAULT NULL COMMENT '菜单编码',
  `create_by_name` varchar(255) DEFAULT NULL,
  `update_by_name` varchar(255) DEFAULT NULL,
  `is_delete` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
--  Records of `sys_menu`
-- ----------------------------
BEGIN;

INSERT INTO `sys_menu`
VALUES ('1', '-1', 'PAGE', '统计', '', '统计', null, null, null, null, '1', null, 'icon-home', null, 'dashboard', null, null);

INSERT INTO `sys_menu` VALUES 
('1000', '-1', 'MODULE', '系统管理', '/**', '系统管理', null, null, null, null, '6', null, 'icon-system', null, 'sysManager', null, null), 
('1001', '1000', 'PAGE', '用户管理', '/userController/**', '用户管理', null, null, null, null, '1', null, null, null, 'user/userPage', null, null), 
('100101', '1001', 'BUTTON', '新增', '/userController/create', '新增用户', null, null, null, null, null, null, null, null, 'user-create', null, null), 
('100102', '1001', 'BUTTON', '编辑', '/userController/update', '编辑用户', null, null, null, null, '1', null, null, null, 'user-update', null, null), 
('100103', '1001', 'BUTTON', '删除', '/userController/delete', '删除用户', null, null, null, null, null, null, null, null, 'user-delete', null, null), 
('100104', '1001', 'BUTTON', '重置密码', '/userController/restPwd', null, null, null, null, null, null, null, null, null, 'user-restPwd', null, null), 
('100105', '1001', 'BUTTON', '保存用户角色关系', '/roleController/saveUserRole', '保存用户角色关系', null, null, null, null, null, null, null, null, 'role-saveUserRole', null, null),
('100106', '1001', 'FUNC', '用户查询', '/userController/pageList', '用户查询', null, null, null, null, null, null, null, null, 'user-pageList', null, null);
 


 INSERT INTO `sys_menu` VALUES 
 ('1002', '1000', 'PAGE', '角色管理', '/roleController/pageList', '角色管理', null, null, null, null, '2', null, null, null, 'role/rolePage', null, null), 
 ('100201', '1002', 'BUTTON', '新增', '/roleController/create', '创建角色', null, null, null, null, null, null, null, null, 'role-create', null, null), 
 ('100202', '1002', 'BUTTON', '编辑', '/roleController/update', '编辑角色', null, null, null, null, '1', null, null, null, 'role-update', null, null), 
 ('100203', '1002', 'BUTTON', '删除', '/roleController/delete', '删除角色', null, null, null, null, null, null, null, null, 'role-delete', null, null), 
 ('100204', '1002', 'BUTTON', '新增用户', '/roleController/addUsers', '新增用户', null, null, null, null, null, null, null, null, 'role-saveUsers', null, null), 
 ('100205', '1002', 'BUTTON', '删除用户', '/roleController/deleteUsers', '删除用户', null, null, null, null, null, null, null, null, 'role-deleteUsers', null, null), 
 ('100206', '1002', 'BUTTON', '关联权限', '/roleController/saveUserRole', '保存角色权限关系', null, null, null, null, null, null, null, null, 'role-saveRoleMenu', null, null),
 ('100207', '1002', 'FUNC', '角色查询', '/roleController/saveUserRole', '角色查询', null, null, null, null, null, null, null, null, 'role-pageList', null, null),
 ('100208', '1003', 'FUNC', '角色下用户查询', '/roleController/saveUserRole', '角色下用户查询', null, null, null, null, null, null, null, null, 'role-userPageList', null, null);
 
 INSERT INTO `sys_menu` VALUES 
 ('1003', '1000', 'PAGE', '菜单管理', '/menuController/tree', '菜单管理', null, null, null, null, '3', null, null, null, 'menuList', null, null), 
 ('100301', '1003', 'BUTTON', '新增', '/menuController/create', '创建菜单', null, null, null, null, null, null, null, null, 'menu-create', null, null), 
 ('100302', '1003', 'BUTTON', '编辑', '/menuController/update', '编辑菜单', null, null, null, null, '1', null, null, null, 'menu-update', null, null), 
 ('100303', '1003', 'BUTTON', '删除', '/menuController/delete', '删除菜单', null, null, null, null, null, null, null, null, 'menu-delete', null, null);

 INSERT INTO `sys_menu` VALUES 
 ('1004', '1000', 'PAGE', '租户管理', '/tenantController/**', '租户管理', null, null, null, null, '5', null, null, null, 'tenantList', null, null),
 ('100401', '1004', 'BUTTON', '编辑', '/tenantController/update', '编辑', null, null, null, null, '1', null, null, null, 'tenant-update', null, null), 
 ('100402', '1004', 'BUTTON', '失效', '/tenantController/delete', '失效', null, null, null, null, null, null, null, null, 'tenant-delete', null, null);


 INSERT INTO `sys_menu` VALUES 
 ('1006', '1000', 'PAGE', '系统日志', '/sysLog/page', '系统日志', null, null, null, null, '6', null, null, null, 'sysLogList', null, null);

  INSERT INTO `sys_menu` VALUES
 ('1100', '-1', 'MODULE', '个人中心', '/bpmController/**', '个人中心', null, null, null, null, '2', null, null, null, 'myCenter', null, null), 
 ('1101', '1100', 'PAGE', '我的待办', '/bpmController/getMyTodoTaskPage', '我的待办', null, null, null, null, '1', null, null, null, 'myUndoPage', null, null), 
 ('1102', '1100', 'PAGE', '我的已办', '/bpmController/getMyDoneTaskPage', '我的已办', null, null, null, null, '2', null, null, null, 'myDonePage', null, null),
 ('1103', '1100', 'PAGE', '我发起的审批', '/bpmController/getMyStartProcessInstancePage', '我发起的审批', null, null, null, null, '2', null, null, null, 'myStartPage', null, null);


  INSERT INTO `sys_menu` VALUES
 ('2000', '-1', 'MODULE', '素材管理', '', '素材管理', null, null, null, null, '2', null, 'icon-sucai', null, 'sourceManager', null, null), 
 ('2001', '2000', 'PAGE', '素材列表', '/resource/page', '素材列表', null, null, null, null, '1', null, null, null, 'sourcePage', null, null), 
 ('200101', '2001', 'BUTTON', '新增', '/userController/createUser', '新增素材', null, null, null, '1', null, null, null, null, 'source-create', null, null), 
 ('200102', '2001', 'BUTTON', '编辑', '/userController/update', '编辑素材', null, null, null, null, '2', null, null, null, 'source-update', null, null), 
 ('200103', '2001', 'BUTTON', '删除', '/userController/delete', '删除素材', null, null, null, null, '3', null, null, null, 'source-delete', null, null), 
 ('2002', '2000', 'PAGE', '素材回收站', '/resource/page', '素材回收站', null, null, null, null, '2', null, null, null, 'resourcePage', null, null), 
 ('200201', '2002', 'BUTTON', '编辑', '/userController/update', '编辑素材', null, null, null, null, '2', null, null, null, 'reSource-update', null, null), 
 ('200202', '2002', 'BUTTON', '撤回', '/userController/reback', '撤回素材', null, null, null, null, '3', null, null, null, 'reSource-reback', null, null), 
 ('200203', '2002', 'BUTTON', '彻底删除', '/userController/delete', '删除素材', null, null, null, null, '3', null, null, null, 'reSource-delete', null, null);
 
 
  INSERT INTO `sys_menu` VALUES
 ('3000', '-1', 'MODULE', '题目管理', '', '题目管理', null, null, null, null, '3', null, 'icon-sucai', null, 'questionManager', null, null), 
 ('3001', '3000', 'PAGE', '题目列表', '/resource/page', '题目列表', null, null, null, null, '1', null, null, null, 'questionPage', null, null), 
 ('300101', '3001', 'BUTTON', '新增', '/userController/createUser', '新增题目', null, null, null, '1', null, null, null, null, 'question-create', null, null), 
 ('300102', '3001', 'BUTTON', '编辑', '/userController/update', '编辑题目', null, null, null, null, '2', null, null, null, 'question-update', null, null), 
 ('300103', '3001', 'BUTTON', '删除', '/userController/delete', '删除题目', null, null, null, null, '3', null, null, null, 'question-delete', null, null), 
 ('3002', '3000', 'PAGE', '题目回收站', '/resource/page', '题目回收站', null, null, null, null, '2', null, null, null, 'reQuestionPage', null, null), 
 ('300201', '3002', 'BUTTON', '编辑', '/userController/update', '编辑题目', null, null, null, null, '2', null, null, null, 'reQuestion-update', null, null), 
 ('300202', '3002', 'BUTTON', '撤回', '/userController/reback', '撤回题目', null, null, null, null, '3', null, null, null, 'reQuestion-reback', null, null), 
 ('300203', '3002', 'BUTTON', '彻底删除', '/userController/delete', '删除题目', null, null, null, null, '3', null, null, null, 'reQuestion-delete', null, null); 
 
  INSERT INTO `sys_menu` VALUES
 ('4000', '-1', 'MODULE', '试卷管理', '', '试卷管理', null, null, null, null, '4', null, 'icon-sucai', null, 'examPapperManager', null, null), 
 ('4001', '4000', 'PAGE', '试卷列表', '/resource/page', '试卷列表', null, null, null, null, '1', null, null, null, 'examPapperPage', null, null), 
 ('400101', '3001', 'BUTTON', '新增', '/userController/createUser', '新增试卷', null, null, null, '1', null, null, null, null, 'examPapper-create', null, null), 
 ('400102', '3001', 'BUTTON', '编辑', '/userController/update', '编辑试卷', null, null, null, null, '2', null, null, null, 'examPapper-update', null, null), 
 ('400103', '3001', 'BUTTON', '删除', '/userController/delete', '删除试卷', null, null, null, null, '3', null, null, null, 'examPapper-delete', null, null), 
 ('4002', '4000', 'PAGE', '试卷回收站', '/resource/page', '试卷回收站', null, null, null, null, '2', null, null, null, 'reExamPapperPage', null, null), 
 ('400201', '3002', 'BUTTON', '编辑', '/userController/update', '编辑试卷', null, null, null, null, '2', null, null, null, 'reExamPapper-update', null, null), 
 ('400202', '3002', 'BUTTON', '撤回', '/userController/reback', '撤回试卷', null, null, null, null, '3', null, null, null, 'reExamPapper-reback', null, null), 
 ('400203', '3002', 'BUTTON', '彻底删除', '/userController/delete', '彻底删除试卷', null, null, null, null, '3', null, null, null, 'reExamPapper-delete', null, null);
 
  INSERT INTO `sys_menu` VALUES
 ('5000', '-1', 'MODULE', '书本管理', '', '书本管理', null, null, null, null, '5', null, 'icon-sucai', null, 'bookManager', null, null), 
 ('5001', '5000', 'PAGE', '书本列表', '/resource/page', '书本列表', null, null, null, null, '1', null, null, null, 'bookPage', null, null), 
 ('500101', '5001', 'BUTTON', '新增', '/userController/createUser', '新增书本', null, null, null, '1', null, null, null, null, 'book-create', null, null), 
 ('500102', '5001', 'BUTTON', '编辑', '/userController/update', '编辑书本', null, null, null, null, '2', null, null, null, 'book-update', null, null), 
 ('500103', '5001', 'BUTTON', '删除', '/userController/delete', '删除书本', null, null, null, null, '3', null, null, null, 'book-delete', null, null), 
 ('5002', '5000', 'PAGE', '书本回收站', '/resource/page', '书本回收站', null, null, null, null, '2', null, null, null, 'reBookPage', null, null),
 ('500201', '6002', 'BUTTON', '编辑', '/userController/update', '编辑书本', null, null, null, null, '2', null, null, null, 'reBook-update', null, null), 
 ('500202', '6002', 'BUTTON', '撤回', '/userController/reback', '撤回书本', null, null, null, null, '3', null, null, null, 'reBook-reback', null, null), 
 ('500203', '6002', 'BUTTON', '彻底删除', '/userController/delete', '彻底删除书本', null, null, null, null, '3', null, null, null, 'reBook-delete', null, null); 
 
  INSERT INTO `sys_menu` VALUES
 ('6000', '-1', 'MODULE', '课程管理', '', '课程管理', null, null, null, null, '6', null, 'icon-sucai', null, 'courseManager', null, null), 
 ('6001', '6000', 'PAGE', '课程列表', '/resource/page', '课程列表', null, null, null, null, '1', null, null, null, 'coursePage', null, null), 
 ('600101', '6001', 'BUTTON', '新增', '/userController/createUser', '新增课程', null, null, null, '1', null, null, null, null, 'course-create', null, null), 
 ('600102', '6001', 'BUTTON', '编辑', '/userController/update', '编辑课程', null, null, null, null, '2', null, null, null, 'course-update', null, null), 
 ('600103', '6001', 'BUTTON', '删除', '/userController/delete', '删除课程', null, null, null, null, '3', null, null, null, 'course-delete', null, null),
 ('6002', '6000', 'PAGE', '课程回收站', '/resource/page', '课程回收站', null, null, null, null, '2', null, null, null, 'reCoursePage', null, null), 
 ('600201', '6002', 'BUTTON', '编辑', '/userController/update', '编辑课程', null, null, null, null, '2', null, null, null, 'reCoursePage-update', null, null), 
 ('600202', '6002', 'BUTTON', '撤回', '/userController/reback', '撤回课程', null, null, null, null, '3', null, null, null, 'reCoursePage-reback', null, null), 
 ('600203', '6002', 'BUTTON', '彻底删除', '/userController/delete', '彻底删除课程', null, null, null, null, '3', null, null, null, 'reCoursePage-delete', null, null);

 
 INSERT INTO `sys_menu` VALUES 
('7000', '-1', 'MODULE', '通用数据管理', '/**', '通用数据管理', null, null, null, null, '6', null, 'icon-system', null, 'commonDataManager', null, null);
 INSERT INTO `sys_menu` VALUES 
 ('7001', '7000', 'PAGE', '标签分类管理', '/tagClassController/**', '标签分类管理', null, null, null, null, '5', null, null, null, 'tagClassList', null, null),
 ('700101', '7001', 'BUTTON', '新增', '/tagClassController/create', '创建标签分类', null, null, null, null, null, null, null, null, 'tagClass-create', null, null), 
 ('700102', '7001', 'BUTTON', '编辑', '/tagClassController/update', '编辑标签分类', null, null, null, null, '1', null, null, null, 'tagClass-update', null, null), 
 ('700103', '7001', 'BUTTON', '删除', '/tagClassController/delete', '删除标签分类', null, null, null, null, null, null, null, null, 'tagClass-delete', null, null);
 INSERT INTO `sys_menu` VALUES 
 ('7002', '7000', 'PAGE', '标签管理', '/tagController/pageList', '标签管理', null, null, null, null, '3', null, null, null, 'menuList', null, null), 
 ('700201', '7002', 'BUTTON', '新增', '/tagController/create', '创建标签', null, null, null, null, null, null, null, null, 'tag-create', null, null), 
 ('700202', '7002', 'BUTTON', '编辑', '/tagController/update', '编辑标签', null, null, null, null, '1', null, null, null, 'tag-update', null, null), 
 ('700203', '7002', 'BUTTON', '删除', '/tagController/delete', '删除标签', null, null, null, null, null, null, null, null, 'tag-delete', null, null),
 ('700204', '7002', 'BUTTON', '新增标签分类', '/tagClassController/create', '新增标签分类', null, null, null, null, null, null, null, null, 'tag-tagClassCreate', null, null);




COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
