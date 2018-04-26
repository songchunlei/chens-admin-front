import api from '@/api'
import Vue from 'vue'

export function getTagClasses() {
    api.getTagClassList().then((res) => {
        const json = res.data;
        if (json.code === 1) {
          return json.data;
        }
      }).catch((error) => {
        Vue.prototype.$message.error(error);
      });
    return {};
}

export function getTagsByClassId(classId) {
    api.getTagList({"classId":classId}).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          return json.data;
        }
      }).catch((error) => {
        Vue.prototype.$message.error(error);
      });
    return {};
}