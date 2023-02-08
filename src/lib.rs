use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

// 将 wee_alloc 注册为全局内存分配器
#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;
