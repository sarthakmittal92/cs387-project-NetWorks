import React from 'react'

import { ChatEngine } from 'react-chat-engine'

export function Chat() {
  return (
    <ChatEngine
      publicKey={'c6ede2ee-db27-4144-bc0f-214251a7b29a'}
      userName={'john_smith'}
      userSecret={'secret_1234'}
    />
  )
}