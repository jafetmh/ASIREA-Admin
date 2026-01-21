<template>
  <div>
    <!--         <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-floating mb-3">
                  <InputComponent id="titulo" v-model="formData.titulo" placeholder="Ingrese el título" required
                    class="form-control" />
                  <label for="titulo">Título</label>
                </div>
                <div class="form-floating mb-3">
                  <textarea id="descripcion" class="form-control" v-model="formData.descripcion"
                    placeholder="Ingrese la noticia" style="height: 100px" required></textarea>
                  <label for="descripcion">Contenido</label>
                </div>
              </div>
              <div class="col-md-6">
                <div id="file">
                  <div class="form-floating mb-3">
                    <label for="imagen">Imagen/Portada</label>
                    <input type="file" id="imagen" class="form-control file-input" ref="imageInput" accept="image/*"
                      @change="onImageSelected" />
                  </div>
                </div>
                <div class="with-document mb-2">
                  <label>Incluir archivo/documento</label>
                  <div class="switch-container">
                    <input type="checkbox" id="document-switch" v-model="documentEnabled" class="switch-input" />
                    <label for="document-switch" class="switch-label"></label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating mb-3">
                  <select name="" id="cat" class="form-select form-control" aria-label="Default select example">
                    <option selected>Elige una categoria</option>
                    <option value="1">Noticia</option>
                    <option value="2">Informe</option>
                    <option value="3">Proyecto</option>
                  </select>
                  <label for="cat">Categoria</label>
                </div>
              </div>
              <div class="col-md-6">
                <Transition name="document-slide">
                  <div v-if="documentEnabled" id="file">
                    <div class="form-floating mb-2">
                      <label for="documento">Documento</label>
                      <input type="file" id="documento" ref="documentInput" accept=".pdf,.doc,.docx"
                        @change="onDocumentSelected" class="form-control file-input" />
                    </div>
                  </div>
                </Transition>
              </div>
              <div class="col-md-6">

              </div>
            </div>
          </form>
        </div> -->
  </div>
</template>
