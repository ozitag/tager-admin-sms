<template>
  <div>
    <p v-if="isOpen" class="sms-body" v-html="log.body" />
    <base-button
      variant="outline-secondary"
      class="toggle-button"
      @click="toggleBody"
    >
      {{ isOpen ? 'Hide Body' : 'View Body' }}
    </base-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { SmsLog } from '../../../typings/model';

type Props = Readonly<{ log: SmsLog }>;

export default defineComponent<Props>({
  name: 'SmsBodyCell',
  props: {
    log: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const isOpen = ref<boolean>(false);

    function toggleBody() {
      isOpen.value = !isOpen.value;
    }

    return { isOpen, toggleBody };
  },
});
</script>

<style scoped>
.toggle-button {
  white-space: nowrap;
}

.sms-body {
  margin-bottom: 1rem;
}
</style>
