'use client';

import React from 'react';
import { forgetPasswordAsync, useDispatch } from '@/lib/redux';

export default function updatePassword() {
  const dispatch = useDispatch();
  return (
    <div>
      updatePassword
      <button type="button" onClick={() => dispatch(forgetPasswordAsync())}>
        upatePassword
      </button>
    </div>
  );
}
