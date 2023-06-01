import {createRouter, createWebHashHistory} from "vue-router";
import DiffProduct from "@/components/diff-product.vue";
import SpecsTable from "@/components/specs-table.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: DiffProduct},
        {path: '/specs', component: SpecsTable}
    ],
})

export default router