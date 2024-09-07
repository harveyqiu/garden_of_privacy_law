'use client'

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from 'lucide-react'; // 确保已安装 lucide-react
import { NotificationData } from './data';
interface RowDefinition {
  key: keyof Omit<NotificationData, 'region'>;
  label: string;
}

const CompareNotificationPage = () => {
  const [hiddenRows, setHiddenRows] = useState<number[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<number[]>([]);

  const data: NotificationData[] = [
    { region: '中国大陆', purpose: '需要披露', identity: '需要披露', officer: '需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '香港', purpose: '需要披露', identity: '不需要披露', officer: '需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '新加坡', purpose: '需要披露', identity: '需要披露', officer: '需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露123' },
    { region: '美国联邦', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '加拿大联邦', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '中国香港地区', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '中国澳门地区', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '中国台湾地区', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '日本', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '韩国', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '英国', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
    { region: '沙特', purpose: '需要披露', identity: '需要披露', officer: '不需要披露', basis: '需要披露', categories: '需要披露', source: '需要披露', legitimateInterest: '需要披露', recipients: '需要披露', retention: '需要披露', transfer: '需要披露', dataSecurity: '需要披露', rights: '需要披露', consent: '需要披露', hold: '需要披露', complaint: '需要披露', contractOrLegalObligation: '需要披露', automatedDecisionMaking: '需要披露', other: '需要披露' },
  ];
  const rows: RowDefinition[] = [
    { key: 'identity', label: '控制者的身份和联系方式（如适用，控制者的代表）' },
    { key: 'officer', label: '数据保护官的联系方式（如适用）' },
    { key: 'purpose', label: '处理个人数据的预期目的' },
    { key: 'basis', label: '处理的合法性基础' },
    { key: 'categories', label: '相关的个人信息的类别' },
    { key: 'source', label: '个人数据的来源，以及（如适用）是否来自公开可访问的来源' },
    { key: 'legitimateInterest', label: '控制者或第三方追求的合法利益' },
    { key: 'recipients', label: '可能披露个人数据的接收者或接收者类别' },
    { key: 'retention', label: '个人数据将被存储的期限，如果无法确定，则说明用于确定该期限的标准' },
    { key: 'transfer', label: '关于向第三国传输数据的信息（如适用），以及对适当或合适的保障措施的引用，以及获取其副本的方式或已提供的地方' },
    { key: 'dataSecurity', label: '为数据提供的安全措施' },
    { key: 'rights', label: '数据主体权利的存在' },
    { key: 'consent', label: '如果处理基于同意，撤回同意的权利的存在' },
    { key: 'hold', label: '数据的保存方式' },
    { key: 'complaint', label: '向监管机构提出投诉的权利' },
    { key: 'contractOrLegalObligation', label: '提供个人数据是否为法定或合同要求，或订立合同所必需的要求，以及数据主体是否有义务提供个人数据和不提供此类数据可能产生的后果' },
    { key: 'automatedDecisionMaking', label: '如适用，有关自动决策（包括分析）的信息' },
    { key: 'other', label: '其他信息' },
  ];
  const columns = data.map(item => item.region);

  const toggleRow = (rowIndex: number) => {
    setHiddenRows(prev =>
      prev.includes(rowIndex)
        ? prev.filter(r => r !== rowIndex)
        : [...prev, rowIndex]
    );
  };

  const toggleColumn = (columnIndex: number) => {
    setHiddenColumns(prev =>
      prev.includes(columnIndex)
        ? prev.filter(c => c !== columnIndex)
        : [...prev, columnIndex]
    );
  };

  const showRow = (rowIndex: number) => {
    setHiddenRows(prev => prev.filter(r => r !== rowIndex));
  };

  const showColumn = (columnIndex: number) => {
    setHiddenColumns(prev => prev.filter(c => c !== columnIndex));
  };

  const showAllRows = () => {
    setHiddenRows([]);
  };

  const showAllColumns = () => {
    setHiddenColumns([]);
  };

  const renderCell = (value: string) => {
    if (value === '需要披露') {
      return <CheckIcon className="text-green-500 mx-auto" />;
    } else if (value === '不需要披露') {
      return <XIcon className="text-red-500 mx-auto" />;
    }
    return value;
  };

  const isRowAllDisclosure = (rowKey: keyof Omit<NotificationData, 'region'>) => {
    return data.every(item => item[rowKey] === '需要披露');
  };

  return (
    <div>
      <div className="mb-4 space-x-2">
        <Button onClick={showAllRows} disabled={hiddenRows.length === 0}>
          显示所有行
        </Button>
        <Button onClick={showAllColumns} disabled={hiddenColumns.length === 0}>
          显示所有列
        </Button>
      </div>
      <div className="mb-4">
        <h3>隐藏的行：</h3>
        {hiddenRows.map(rowIndex => (
          <Button key={rowIndex} onClick={() => showRow(rowIndex)} className="mr-2 mb-2">
            恢复行 {rows[rowIndex].label}
          </Button>
        ))}
      </div>
      <div className="mb-4">
        <h3>隐藏的列：</h3>
        {hiddenColumns.map(columnIndex => (
          <Button key={columnIndex} onClick={() => showColumn(columnIndex)} className="mr-2 mb-2">
            恢复列 {columns[columnIndex]}
          </Button>
        ))}
      </div>
      <div className="overflow-x-auto w-full">
        <div className="inline-block min-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-10 bg-white w-[200px]">内容类型</TableHead>
                {columns.map((column, index) => (
                  !hiddenColumns.includes(index) && (
                    <TableHead key={column} className="w-[150px]">
                      <div className="flex items-center justify-center">
                        <Checkbox
                          checked={!hiddenColumns.includes(index)}
                          onCheckedChange={() => toggleColumn(index)}
                          className="mr-2"
                        />
                        {column}
                      </div>
                    </TableHead>
                  )
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                !hiddenRows.includes(rowIndex) && (
                  <TableRow 
                    key={row.key} 
                    className={isRowAllDisclosure(row.key) ? 'bg-yellow-100' : ''}
                  >
                    <TableCell className="sticky left-0 z-10 bg-white w-[200px]">
                      <div className="flex items-start">
                        <Checkbox
                          checked={!hiddenRows.includes(rowIndex)}
                          onCheckedChange={() => toggleRow(rowIndex)}
                          className="mr-2 mt-1"
                        />
                        <span className="text-sm break-words">{row.label}</span>
                      </div>
                    </TableCell>
                    {data.map((item, columnIndex) => (
                      !hiddenColumns.includes(columnIndex) && (
                        <TableCell key={item.region} className="w-[150px] text-center">
                          {renderCell(item[row.key])}
                        </TableCell>
                      )
                    ))}
                  </TableRow>
                )
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CompareNotificationPage;
