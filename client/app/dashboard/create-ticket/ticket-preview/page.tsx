'use client';
import { Button } from '@/component/button';
import ArrowLeft from '@/component/svgs/arrowLeft';
import ArrowRight from '@/component/svgs/arrowRight';
import { Typography } from '@/component/typogrphy';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { ticketAction } from '@/mainStore/reduxSlices/ticketDetailSlice';
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading , setLoading]= useState<Boolean>(false);

  const placeholder = '/placeholder.jpg';
  const ticketState = useSelector((state) => state.ticketDetail);

  const {
    ticketName,
    ticketDescription,
    category,
    amount,
    quantity,
    image,
    imageName,
  } = ticketState;

  const checkstate = () => {
    return (
      ticketName &&
      ticketDescription &&
      category &&
      amount > 0 &&
      quantity > 0 &&
      image &&
      imageName
    );
  };

  const getState = checkstate();

  const submitEventForm = async () => {
    setLoading(true)
    if (!getState) {
      console.error('Validation failed');
      return;
    }

    const formObject = {
      id: nanoid(),
      name: ticketName,
      image: image,
      description: ticketDescription,
      quantity: quantity,
      category: category,
      price: amount,
      productFile: 'https://example.com/file.pdf',
      unlimited: false,
      payAnyPrice: false,
      type: 'Conference',
      location: '123 Main St, Anytown, USA',
      date: '2024-12-01T00:00:00.000Z',
    };

    try {
      const response = await axios.post(
        `https://eventmint.onrender.com/api/v1/event/${formObject.id}`,
        formObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('Response:', response.data);
      dispatch(ticketAction.resetTicketDetails());
      router.push('/dashboard/tickets')
      setLoading(false)
      toast.success(response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (err) {
      const errorMessage = err?.message;

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false)
    }
  };



  return (
    <div>
      <div className="px-[32px] w-full flex gap-[48px]">
        <div className="w-1/2 flex flex-col items-start gap-[24px] py-[16px] flex-[1_0_0%] rounded-[16px] bg-[#191D23]">
          <div className="flex flex-col items-start gap-[16px] self-stretch px-[16px] pb-[16px] border-b border-[#323A46]">
            <Typography customClassName="text-body-xxsx font-open-sans text-[#64748B]">
              Ticket Name
            </Typography>
            <Typography customClassName="text-body-s font-open-sans text-[#E7EAEE]">
              {ticketName}
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch px-[16px] pb-[16px] border-b border-[#323A46]">
            <Typography customClassName="text-body-xxsx font-open-sans text-[#64748B]">
              Ticket Description
            </Typography>
            <Typography customClassName="text-body-s font-open-sans text-[#E7EAEE]">
              {ticketDescription}
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch px-[16px] pb-[16px] border-b border-[#323A46]">
            <Typography customClassName="text-body-xxsx font-open-sans text-[#64748B]">
              Category
            </Typography>
            <Typography customClassName="text-body-s font-open-sans text-[#E7EAEE]">
              {category}
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch px-[16px] pb-[16px] border-b border-[#323A46]">
            <Typography customClassName="text-body-xxsx font-open-sans text-[#64748B]">
              Amount
            </Typography>
            <Typography customClassName="text-body-s font-open-sans text-[#E7EAEE]">
              {amount} SOL
            </Typography>
          </div>
          <div className="flex flex-col items-start gap-[16px] self-stretch px-[16px] pb-[16px]">
            <Typography customClassName="text-body-xxsx font-open-sans text-[#64748B]">
              Quantity
            </Typography>
            <Typography customClassName="text-body-s font-open-sans text-[#E7EAEE]">
              {quantity}
            </Typography>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-4 items-start">
          <div>
            <Typography customClassName="text-body-xxsx font-open-sans text-[#64748B]">
              Ticket Image
            </Typography>
          </div>
          <div className="relative max-w-[400px] group max-h-[400px]">
            <Image
              className="relative rounded-[16px]"
              src={image ? image : placeholder}
              alt="ticket image"
              width={400}
              height={400}
            />
            <div className="absolute bottom-0 rounded-b-[16px] w-full h-[56px] px-[16px] py-[8px] justify-end items-center gap-[4px] flex flex-1 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Typography customClassName="text-body-xxsx font-open-sans text-[#E7EAEE]">
                {imageName}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end px-[24px] pt-[24px] pb-[32px] gap-[16px]">
        <Button
          leftIcon={<ArrowLeft />}
          label="Back"
          fit
          customClassName="font-open-sas text-body-s text-[#323A46]"
          size="smaller"
          onClick={() => router.push('/dashboard/create-ticket/ticket-details')}
        />
        <Button
          label="Submit"
          customClassName="text-body-xxs font-open-sans bg-gradient-to-b-custom rounded-[12px]"
          size="smaller"
          fit
          onClick={submitEventForm}
        />
      </div>
    </div>
  );
}
