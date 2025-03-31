'use client';

import { Grid, Tag } from '@lobehub/ui';
import { Typography } from 'antd';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import { aiProviderSelectors, useAiInfraStore } from '@/store/aiInfra';

import Card from './Card';

const loadingArr = Array.from({ length: 12 })
  .fill('-')
  .map((item, index) => `${index}x${item}`);

const List = memo(() => {
  const { t } = useTranslation('modelProvider');
  const enabledList = useAiInfraStore(aiProviderSelectors.enabledAiProviderList, isEqual);
  const disabledList = useAiInfraStore(aiProviderSelectors.disabledAiProviderList, isEqual);
  const [initAiProviderList] = useAiInfraStore((s) => [s.initAiProviderList]);

  if (!initAiProviderList)
    return (
      <Flexbox gap={24} paddingBlock={'0 16px'}>
        <Flexbox align={'center'} gap={4} horizontal>
          <Typography.Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {t('list.title.enabled')}
          </Typography.Text>
        </Flexbox>
        <Grid gap={16} rows={3}>
          {loadingArr.map((item) => (
            <Card enabled={false} id={item} key={item} loading source={'builtin'} />
          ))}
        </Grid>
      </Flexbox>
    );

  return (
    <>
      <Flexbox gap={24}>
        <Flexbox align={'center'} gap={8} horizontal>
          <Typography.Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {t('list.title.enabled')}
          </Typography.Text>
          <Tag>{enabledList.length}</Tag>
        </Flexbox>
        <Grid gap={16} rows={3}>
          {enabledList.map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </Grid>
      </Flexbox>
      <Flexbox gap={24}>
        <Flexbox align={'center'} gap={8} horizontal>
          <Typography.Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {t('list.title.disabled')}
          </Typography.Text>
          <Tag>{disabledList.length}</Tag>
        </Flexbox>
        <Grid gap={16} rows={3}>
          {disabledList.map((item) => (
            <Card {...item} key={item.id} />
          ))}
        </Grid>
      </Flexbox>
    </>
  );
});

export default List;
